<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);

    // make mysqli throw exceptions on any failure so the transaction below can roll back cleanly
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $uid = $_SESSION["uid"];
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!is_array($data)) {
        $data = [];
    }

    // Delivery details from the checkout form. Items and prices are never read from the browser,
    // they always come from cart_items below.
    $paymentMethod = trim($data["payment_method"]) ?? "";
    $paymentStatus = trim($data["payment_status"]) ?? "";
    $deliveryAddress = is_string($data["delivery_address"] ?? null) ? trim($data["delivery_address"]) : "";
    $contactNumber = is_string($data["contact_number"] ?? null) ? trim($data["contact_number"]) : "";
    $status = is_string($data["status"] ?? null) ? trim($data["status"]) : "";
    $deliveryFee = 100; // keep in sync with deliveryFee in checkout.jsx

    if ($deliveryAddress === "" || $contactNumber === "") {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // same rules as the checkout form, checked again here because the browser can be bypassed
    if (!preg_match('/^9\d{9}$/', $contactNumber)) {
        echo json_encode(["success" => false, "message" => "Invalid phone number."]);
        exit;
    }

    if (!preg_match('/^[a-zA-Z0-9,\- ]+$/', $deliveryAddress) || strlen($deliveryAddress) > 255) {
        echo json_encode(["success" => false, "message" => "No special character allowed except '-' and ','."]);
        exit;
    }

    if (!in_array($paymentMethod, ["cod", "esewa", "khalti"], true)) {
        echo json_encode(["success" => false, "message" => "Invalid payment method."]);
        exit;
    }

    if (!in_array($paymentStatus, ["paid","unpaid"], true)) {
        echo json_encode(["success" => false, "message" => "Invalid payment status."]);
        exit;
    }

    if (!in_array($status, ['pending', 'processing', 'delivered', 'cancelled'], true)) {
        echo json_encode(["success" => false, "message" => "Invalid payment status."]);
        exit;
    }

    try {
        $conn->begin_transaction();

        // Lock this user's cart rows so a double-click / second request can't order the same cart twice.
        // The second request waits here, and then finds the cart already empty.
        $stmt = $conn->prepare("SELECT cid FROM cart_items WHERE uid = ? FOR UPDATE");
        $stmt->bind_param("i", $uid);
        $stmt->execute();
        $stmt->close();

        // Read the cart together with the product details we need to snapshot
        $stmt = $conn->prepare(
            "SELECT ci.vid, ci.quantity,
                p.pname, p.price,
                pv.size, pv.color
            FROM cart_items ci
            INNER JOIN product_variant pv ON pv.vid = ci.vid
            INNER JOIN products p ON p.pid = pv.pid
            WHERE ci.uid = ?"
        );
        $stmt->bind_param("i", $uid);
        $stmt->execute();
        $cartRows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        if (count($cartRows) === 0) {
            $conn->rollback();
            echo json_encode(["success" => false, "message" => "Your cart is empty."]);
            exit;
        }

        // Total is calculated here from the database prices, never from anything sent by the browser.
        // Done in whole cents to avoid floating point drift.
        $totalPaisa = 0;
        foreach ($cartRows as $row) {
            $totalPaisa += (int)round((float)$row["price"] * 100) * (int)$row["quantity"];
        }
        $totalPaisa += $deliveryFee * 100; // orders has no delivery fee column, so total = items + delivery
        $total = number_format($totalPaisa / 100, 2, ".", "");

        // Create the order
        $stmt = $conn->prepare(
            "INSERT INTO orders (uid, payment_method, payment_status, status, total, delivery_address, contact_number)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param("issssss", $uid, $paymentMethod, $paymentStatus, $status, $total, $deliveryAddress, $contactNumber);
        $stmt->execute();
        $oid = $conn->insert_id;
        $stmt->close();

        // Save every cart item as an order item (name/size/color/price are stored as they are right now)
        $stmt = $conn->prepare(
            "INSERT INTO order_items (oid, vid, pname_snapshot, size_snapshot, color_snapshot, quantity, price_at_purchase)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        // Only succeeds while enough stock is left, so stock can never go below 0,
        // even if two customers order the last items at the same moment.
        $stockStmt = $conn->prepare("UPDATE product_variant SET stock = stock - ? WHERE vid = ? AND stock >= ?");
        foreach ($cartRows as $row) {
            $vid = (int)$row["vid"];
            $quantity = (int)$row["quantity"];

            $stockStmt->bind_param("iii", $quantity, $vid, $quantity);
            $stockStmt->execute();

            if ($stockStmt->affected_rows === 0) {
                // not enough stock: find out how many are left for the message, then undo everything
                $check = $conn->prepare("SELECT stock FROM product_variant WHERE vid = ?");
                $check->bind_param("i", $vid);
                $check->execute();
                $left = (int)($check->get_result()->fetch_assoc()["stock"] ?? 0);
                $check->close();

                $conn->rollback();
                echo json_encode([
                    "success" => false,
                    "message" => $left > 0
                        ? "Only " . $left . " left in stock for this variant of " . $row["pname"] . "."
                        : "This variant of ".$row["pname"] . " is out of stock."
                ]);
                exit;
            }

            $stmt->bind_param(
                "iisssis",
                $oid, $vid, $row["pname"], $row["size"], $row["color"], $quantity, $row["price"]
            );
            $stmt->execute();
        }
        $stmt->close();
        $stockStmt->close();

        // Empty the cart
        $stmt = $conn->prepare("DELETE FROM cart_items WHERE uid = ?");
        $stmt->bind_param("i", $uid);
        $stmt->execute();
        $stmt->close();

        $conn->commit();

        echo json_encode([
            "success" => true,
            "message" => "Order placed successfully.",
        ]);
    } catch (Throwable $e) {
        // Nothing is saved if any step failed: the cart stays as it was
        try { $conn->rollback(); } catch (Throwable $ignored) {}
        error_log("placeOrder failed: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "Failed to place the order. Please try again."]);
    }

    $conn->close();
?>
 

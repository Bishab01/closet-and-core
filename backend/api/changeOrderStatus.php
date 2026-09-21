<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer", "retailer"]);

    // make mysqli throw exceptions on any failure so the transaction below can roll back cleanly
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $uid = (int)$_SESSION["uid"];
    $role = $_SESSION["role"];

    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) {
        $data = [];
    }

    $oid = (int)($data["oid"] ?? 0);
    // the status the browser was showing when the button was clicked (used to spot a stale page)
    $shownStatus = is_string($data["oStatus"] ?? null) ? strtolower(trim($data["oStatus"])) : "";

    if ($oid <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid order id."]);
        exit;
    }

    try {
        $conn->begin_transaction();

        // Load the order and lock it, so two clicks / two users can't change it at the same moment.
        // A customer can only load their OWN order; a retailer can load any order.
        if ($role === "customer") {
            $stmt = $conn->prepare("SELECT status, payment_status FROM orders WHERE oid = ? AND uid = ? FOR UPDATE");
            $stmt->bind_param("ii", $oid, $uid);
        } else {
            $stmt = $conn->prepare("SELECT status, payment_status FROM orders WHERE oid = ? FOR UPDATE");
            $stmt->bind_param("i", $oid);
        }
        $stmt->execute();
        $order = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$order) {
            $conn->rollback();
            echo json_encode(["success" => false, "message" => "Order not found."]);
            exit;
        }

        // the real status always comes from the database, never from the browser
        $current = $order["status"];

        if ($shownStatus !== "" && $shownStatus !== $current) {
            $conn->rollback();
            echo json_encode(["success" => false, "message" => "This order was just updated. Please refresh the page."]);
            exit;
        }

        // Work out the one allowed next status for this role
        $newStatus = null;
        $refusal = "This order can't be changed any further.";

        if ($role === "customer") {
            if ($current === "pending") {
                $newStatus = "cancelled";
            } else {
                $refusal = "Only pending orders can be cancelled.";
            }
        } else {
            if ($current === "pending") {
                $newStatus = "processing";
            } elseif ($current === "processing") {
                if ($order["payment_status"] === "paid") {
                    $newStatus = "delivered";
                } else {
                    $refusal = "The order must be paid before it can be marked as delivered.";
                }
            }
        }

        if ($newStatus === null) {
            $conn->rollback();
            echo json_encode(["success" => false, "message" => $refusal]);
            exit;
        }

        // "AND status = ?" makes sure nothing changed it between the read above and this update
        $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE oid = ? AND status = ?");
        $stmt->bind_param("sis", $newStatus, $oid, $current);
        $stmt->execute();
        $stmt->close();

        // A cancelled order gives its items back to stock (placeOrder.php took them out).
        // Items whose variant no longer exists (vid is NULL after the product was edited) are skipped.
        if ($newStatus === "cancelled") {
            $stmt = $conn->prepare(
                "UPDATE product_variant pv
                INNER JOIN (
                    SELECT vid, SUM(quantity) AS qty
                    FROM order_items
                    WHERE oid = ? AND vid IS NOT NULL
                    GROUP BY vid
                ) oi ON oi.vid = pv.vid
                SET pv.stock = pv.stock + oi.qty"
            );
            $stmt->bind_param("i", $oid);
            $stmt->execute();
            $stmt->close();
        }

        $conn->commit();

        echo json_encode([
            "success" => true,
            "message" => "Status successfully updated.",
            "status" => $newStatus
        ]);
    } catch (Throwable $e) {
        try { $conn->rollback(); } catch (Throwable $ignored) {}
        error_log("updateOrderStatus failed: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "Failed to update status."]);
    }

    $conn->close();
?>
 

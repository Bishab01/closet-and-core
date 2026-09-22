<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer", "retailer"]);

    $uid = $_SESSION["uid"];
    $role = $_SESSION["role"];
    $oid = (int)($_GET["oid"] ?? 0);

    if ($oid <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid order id."]);
        exit;
    }

    if ($role === "customer") {
        // the JOIN on orders makes sure a customer can only read the items of their own order
        $stmt = $conn->prepare(
            "SELECT oi.id, oi.pname_snapshot, oi.size_snapshot, oi.color_snapshot,
                oi.quantity, oi.price_at_purchase
            FROM order_items oi
            INNER JOIN orders o ON o.oid = oi.oid
            WHERE oi.oid = ? AND o.uid = ?
            ORDER BY oi.id"
        );
        $stmt->bind_param("ii", $oid, $uid);
    } else {
        // retailer can read the items of any order
        $stmt = $conn->prepare(
            "SELECT oi.id, oi.pname_snapshot, oi.size_snapshot, oi.color_snapshot,
                oi.quantity, oi.price_at_purchase
            FROM order_items oi
            WHERE oi.oid = ?
            ORDER BY oi.id"
        );
        $stmt->bind_param("i", $oid);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = [
            "id" => (int)$row["id"],
            "pname" => $row["pname_snapshot"],
            "size" => $row["size_snapshot"],
            "color" => $row["color_snapshot"],
            "quantity" => (int)$row["quantity"],
            "price" => (float)$row["price_at_purchase"]
        ];
    }

    // every order has at least one item, so an empty result means: no such order, or not this customer's
    if (count($items) === 0) {
        echo json_encode(["success" => false, "message" => "Order not found."]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "items" => $items
    ]);

    $stmt->close();
    $conn->close();
?>
 

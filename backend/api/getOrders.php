<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer", "retailer"]);

    $uid = $_SESSION["uid"];
    $role = $_SESSION["role"];

    if ($role === "customer") {
        // a customer only sees their own orders
        $stmt = $conn->prepare(
            "SELECT oid, payment_method, payment_status, status, total, delivery_address, contact_number, created_at
            FROM orders
            WHERE uid = ?
            ORDER BY oid DESC"
        );
        $stmt->bind_param("i", $uid);
    } else {
        // retailer sees every order: this query has no ? placeholder, so there is nothing to bind
        $stmt = $conn->prepare(
            "SELECT oid, payment_method, payment_status, status, total, delivery_address, contact_number, created_at
            FROM orders
            ORDER BY oid DESC"
        );
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    // having no orders yet is not an error, the frontend just gets an empty list
    echo json_encode([
        "success" => true,
        "orders" => $orders
    ]);

    $stmt->close();
    $conn->close();
?>
 

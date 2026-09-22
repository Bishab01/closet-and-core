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
            "SELECT o.oid, o.payment_method, o.payment_status, o.status, o.total, o.delivery_address,
                o.contact_number, o.created_at, CONCAT(u.fname, ' ', u.lname) AS customer_name
            FROM orders o
            LEFT JOIN users u ON u.uid = o.uid
            WHERE o.uid = ?
            ORDER BY o.oid DESC"
        );
        $stmt->bind_param("i", $uid);
    } else {
        // retailer sees every order: this query has no ? placeholder, so there is nothing to bind
        // customer_name is the name of the customer who placed the order (not the logged-in retailer)
        $stmt = $conn->prepare(
            "SELECT o.oid, o.payment_method, o.payment_status, o.status, o.total, o.delivery_address,
                o.contact_number, o.created_at, CONCAT(u.fname, ' ', u.lname) AS customer_name
            FROM orders o
            LEFT JOIN users u ON u.uid = o.uid
            ORDER BY o.oid DESC"
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
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");
 
    requireRole(["retailer"]);
 
    // A variant counts as "low stock" when this many pieces or fewer are left (0 = out of stock is included).
    $lowStockLimit = 5;
 
    // one query, four counts
    $stmt = $conn->prepare(
        "SELECT
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM orders WHERE status = 'pending') AS pending_orders,
            (SELECT COUNT(*) FROM product_variant WHERE stock <= ?) AS low_stock_items,
            (SELECT COUNT(*) FROM orders WHERE status = 'delivered') AS completed_orders"
    );
    $stmt->bind_param("i", $lowStockLimit);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $stmt->close();
 
    echo json_encode([
        "success" => true,
        "stats" => [
            "totalProducts" => (int)$row["total_products"],
            "pendingOrders" => (int)$row["pending_orders"],
            "lowStockItems" => (int)$row["low_stock_items"],
            "completedOrders" => (int)$row["completed_orders"]
        ]
    ]);
 
    $conn->close();
?>
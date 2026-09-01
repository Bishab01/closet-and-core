<?php
    include("../config/cors.php");
    include("../config/connectDB.php");

    // Public endpoint — no login required, this is what customers browse
    $sql = "SELECT
                p.pid,
                p.pname,
                c.cat_name,
                p.price,
                p.update_at,
                COALESCE(SUM(v.stock), 0) AS total_stock
            FROM products p
            LEFT JOIN category c ON p.cat_id = c.cat_id
            LEFT JOIN product_variant v ON v.pid = p.pid
            GROUP BY p.pid
            ORDER BY p.created_at DESC";

    $result = $conn->query($sql);

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            "id" => (int)$row["pid"],
            "category" => $row["cat_name"] ?? "Uncategorized",
            "productName" => $row["pname"],
            "productPrice" => (float)$row["price"],
            "image" => "productImage.php?pid=" . $row["pid"] . "&v=" . strtotime($row["update_at"]),
            "stock" => (int)$row["total_stock"]
        ];
    }

    echo json_encode([
        "success" => true,
        "products" => $products
    ]);

    $conn->close();
?>
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $sql = "SELECT
                p.pid,
                p.pname,
                p.cat_id,
                c.cat_name,
                p.price,
                p.description,
                p.update_at,
                COALESCE(SUM(v.stock), 0) AS total_stock,
                COUNT(v.vid) AS variant_count
            FROM products p
            LEFT JOIN category c ON p.cat_id = c.cat_id
            LEFT JOIN product_variant v ON v.pid = p.pid
            GROUP BY p.pid
            ORDER BY p.created_at DESC";

    $result = $conn->query($sql);

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            "pid" => (int)$row["pid"],
            "pname" => $row["pname"],
            "cat_id" => $row["cat_id"] !== null ? (int)$row["cat_id"] : null,
            "cat_name" => $row["cat_name"] ?? "Uncategorized",
            "price" => (float)$row["price"],
            "description" => $row["description"],
            "stock" => (int)$row["total_stock"],
            "hasVariants" => (int)$row["variant_count"] > 1,
            // cache-busting timestamp so the browser refetches the image after an edit
            "imageVersion" => strtotime($row["update_at"])
        ];
    }

    echo json_encode([
        "success" => true,
        "products" => $products
    ]);

    $conn->close();
?>
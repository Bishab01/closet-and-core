<?php
include("../config/cors.php");
include("../config/connectDB.php");

$sql = "
    SELECT
        p.pid,
        p.pname,
        p.price,
        p.pimg,
        p.description,
        c.cat_id,
        c.cat_name,
        v.vid,
        v.color,
        v.size,
        v.color_hex,
        v.stock
    FROM products p
    LEFT JOIN category c ON p.cat_id = c.cat_id
    LEFT JOIN product_variant v ON p.pid = v.pid
    ORDER BY p.created_at DESC, p.pid DESC, v.vid ASC
";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch products."
    ]);
    exit;
}

$products = [];

while ($row = $result->fetch_assoc()) {
    $pid = (int) $row["pid"];

    if (!isset($products[$pid])) {
        $image = null;

        if ($row["pimg"] !== null) {
            $image = "data:image/jpeg;base64," . base64_encode($row["pimg"]);
        }

        $products[$pid] = [
            "id" => $pid,
            "categoryId" => $row["cat_id"] !== null ? (int) $row["cat_id"] : null,
            "category" => $row["cat_name"] ?? "Uncategorized",
            "productName" => $row["pname"],
            "productPrice" => (float) $row["price"],
            "image" => $image,
            "description" => $row["description"] ?? "",
            "variants" => []
        ];
    }

    if ($row["vid"] !== null) {
        $products[$pid]["variants"][] = [
            "id" => (int) $row["vid"],
            "color" => $row["color"],
            "size" => $row["size"],
            "hex" => $row["color_hex"],
            "stock" => (int) $row["stock"]
        ];
    }
}

$products = array_values($products);

echo json_encode([
    "success" => true,
    "products" => $products
]);

$result->free();
$conn->close();
?>
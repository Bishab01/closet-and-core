<?php
include("../config/cors.php");
include("../config/connectDB.php");

$sql = "
    SELECT
        p.pid,
        p.pname,
        p.price,
        c.cat_id,
        c.cat_name
    FROM products p
    LEFT JOIN category c ON p.cat_id = c.cat_id
    ORDER BY p.pid DESC
";

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

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
    $products[$pid] = [
        "pid" => $pid,
        "cat_id" => $row["cat_id"] !== null ? (int) $row["cat_id"] : null,
        "cat_name" => $row["cat_name"] ?? "Uncategorized",
        "pname" => $row["pname"],
        "price" => (float) $row["price"]
    ];
}

$products = array_values($products);

echo json_encode([
    "success" => true,
    "products" => $products
]);

$stmt->close();
$conn->close();
?>
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");

    $pid = $_GET["pid"] ?? "";

    if (!ctype_digit((string)$pid)) {
        echo json_encode(["success" => false, "message" => "Invalid product id."]);
        exit;
    }

    $stmt = $conn->prepare(
        "SELECT pid, description FROM products WHERE pid = ?"
    );
    $stmt->bind_param("i", $pid);
    $stmt->execute();
    $product = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$product) {
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }

    $sql =  "
        SELECT 
            vid, 
            color, 
            size, 
            color_hex, 
            stock 
        FROM product_variant 
        WHERE pid = ?
    ";

    $vStmt = $conn->prepare($sql);
    $vStmt->bind_param("i", $pid);
    $vStmt->execute();
    $variantResult = $vStmt->get_result();

    $variants = [];

    while ($v = $variantResult->fetch_assoc()) {
        $variants[] = [
            "vid" => (int)$v["vid"],
            "color" => $v["color"],
            "size" => $v["size"],
            "hex" => $v["color_hex"],
            "stock" => (int)$v["stock"]
        ];
    }

    $vStmt->close();

    echo json_encode([
        "success" => true,
        "productDetails" => [
            "pid" => (int)$product["pid"],
            "description" => $product["description"],
            "variants" => $variants
        ]
    ]);

    $conn->close();
?>
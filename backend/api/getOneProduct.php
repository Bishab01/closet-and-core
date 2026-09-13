<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $pid = $_GET["pid"] ?? "";

    if (!ctype_digit((string)$pid)) {
        echo json_encode(["success" => false, "message" => "Invalid product id."]);
        exit;
    }

    $stmt = $conn->prepare(
        "SELECT pid, pname, cat_id, price, description FROM products WHERE pid = ?"
    );
    $stmt->bind_param("i", $pid);
    $stmt->execute();
    $product = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$product) {
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }

    $vStmt = $conn->prepare(
        "SELECT vid, color, size, color_hex, stock FROM product_variant WHERE pid = ?"
    );
    $vStmt->bind_param("i", $pid);
    $vStmt->execute();
    $variantResult = $vStmt->get_result();

    $variants = [];
    while ($v = $variantResult->fetch_assoc()) {
        $variants[] = [
            "vid" => (int)$v["vid"],
            "color" => $v["color"],
            "size" => $v["size"],
            "color_hex" => $v["color_hex"],
            "stock" => (int)$v["stock"]
        ];
    }
    $vStmt->close();

    echo json_encode([
        "success" => true,
        "product" => [
            "pid" => (int)$product["pid"],
            "pname" => $product["pname"],
            "cat_id" => $product["cat_id"] !== null ? (int)$product["cat_id"] : null,
            "price" => (float)$product["price"],
            "description" => $product["description"],
            "variants" => $variants
        ]
    ]);

    $conn->close();
?>
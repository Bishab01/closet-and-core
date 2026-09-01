<?php
    include("../config/cors.php");
    include("../config/connectDB.php");

    $pid = $_GET["pid"] ?? "";

    if (!ctype_digit((string)$pid)) {
        echo json_encode(["success" => false, "message" => "Invalid product id."]);
        exit;
    }

    $stmt = $conn->prepare(
        "SELECT p.pid, p.pname, c.cat_name, p.price, p.description, p.update_at
         FROM products p
         LEFT JOIN category c ON p.cat_id = c.cat_id
         WHERE p.pid = ?"
    );
    $stmt->bind_param("i", $pid);
    $stmt->execute();
    $product = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$product) {
        echo json_encode(["success" => false, "message" => "Product not found."]);
        exit;
    }

    $vStmt = $conn->prepare("SELECT color, size, color_hex, stock FROM product_variant WHERE pid = ?");
    $vStmt->bind_param("i", $pid);
    $vStmt->execute();
    $variantResult = $vStmt->get_result();

    $colors = [];      // unique {name, hex}
    $sizes = [];        // unique size strings
    $totalStock = 0;

    while ($v = $variantResult->fetch_assoc()) {
        $totalStock += (int)$v["stock"];

        if (!empty($v["color"])) {
            $exists = false;
            foreach ($colors as $c) {
                if ($c["name"] === $v["color"]) { $exists = true; break; }
            }
            if (!$exists) {
                $colors[] = ["name" => $v["color"], "hex" => $v["color_hex"] ?? "#1f2421"];
            }
        }

        if (!empty($v["size"]) && !in_array($v["size"], $sizes)) {
            $sizes[] = $v["size"];
        }
    }
    $vStmt->close();

    echo json_encode([
        "success" => true,
        "product" => [
            "id" => (int)$product["pid"],
            "category" => $product["cat_name"] ?? "Uncategorized",
            "productName" => $product["pname"],
            "productPrice" => (float)$product["price"],
            "description" => $product["description"],
            "image" => "productImage.php?pid=" . $product["pid"] . "&v=" . strtotime($product["update_at"]),
            "colors" => $colors,
            "sizes" => $sizes,
            "stock" => $totalStock
        ]
    ]);

    $conn->close();
?>
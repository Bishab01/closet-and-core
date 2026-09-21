<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");
    include("../config/variantValidation.php");
    
    requireRole(["retailer"]);

    // multipart/form-data because the image is optional-but-possible on edit
    $pid = trim($_POST["pid"] ?? "");
    $pname = trim($_POST["pname"] ?? "");
    $catId = trim($_POST["cat_id"] ?? "");
    $price = trim($_POST["price"] ?? "");
    $description = trim($_POST["description"] ?? "");
    $variantsRaw = $_POST["variants"] ?? "[]";

    if (empty($pid) || empty($pname) || empty($catId) || $price === "") {
        echo json_encode(["success" => false, "message" => "Product name, category and price are required."]);
        exit;
    }

    if (!is_numeric($price) || $price < 0) {
        echo json_encode(["success" => false, "message" => "Price must be a valid positive number."]);
        exit;
    }

    if (strlen($pname) > 40) {
        echo json_encode(["success" => false, "message" => "Product name must be 40 characters or fewer."]);
        exit;
    }

    $variants = json_decode($variantsRaw, true);
    if (!is_array($variants)) {
        $variants = [];
    }

    // Valid sizes only, and no two variants with the same color + size
    [$variants, $variantError] = cleanVariants($variants);
    if ($variantError !== null) {
        echo json_encode(["success" => false, "message" => $variantError]);
        exit;
    }

    $pid = (int)$pid;
    $newImageData = null;
    $imageHash = null;

    if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $_FILES["image"]["tmp_name"]);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes)) {
            echo json_encode(["success" => false, "message" => "Image must be JPG, PNG or WEBP."]);
            exit;
        }

        if ($_FILES["image"]["size"] > 4 * 1024 * 1024) {
            echo json_encode(["success" => false, "message" => "Image must be smaller than 4MB."]);
            exit;
        }

        $newImageData = file_get_contents($_FILES["image"]["tmp_name"]);
        $imageHash = hash("sha256", $newImageData);
    }

    
    // Check 1: the name must not belong to a DIFFERENT product (keeping this product's own name is fine)
    $nameStmt = $conn->prepare("SELECT pid FROM products WHERE pname = ? AND pid <> ? LIMIT 1");
    $nameStmt->bind_param("si", $pname, $pid);
    $nameStmt->execute();
    if ($nameStmt->get_result()->num_rows > 0) {
        $nameStmt->close();
        echo json_encode(["success" => false, "message" => "A product with this name already exists."]);
        exit;
    }
    $nameStmt->close();

    // Check 2: a replacement image must not already be used by a DIFFERENT product
    if ($imageHash !== null) {
        $imgStmt = $conn->prepare("SELECT pid FROM products WHERE SHA2(pimg, 256) = ? AND pid <> ? LIMIT 1");
        $imgStmt->bind_param("si", $imageHash, $pid);
        $imgStmt->execute();
        if ($imgStmt->get_result()->num_rows > 0) {
            $imgStmt->close();
            echo json_encode(["success" => false, "message" => "This image is already used by another product."]);
            exit;
        }
        $imgStmt->close();
    }

    $conn->begin_transaction();

    try {
        if ($newImageData !== null) {
            $stmt = $conn->prepare(
                "UPDATE products SET pname = ?, cat_id = ?, price = ?, pimg = ?, description = ? WHERE pid = ?"
            );
            $null = null;
            $stmt->bind_param("sidbsi", $pname, $catId, $price, $null, $description, $pid);
            $stmt->send_long_data(3, $newImageData);
        } else {
            $stmt = $conn->prepare(
                "UPDATE products SET pname = ?, cat_id = ?, price = ?, description = ? WHERE pid = ?"
            );
            $stmt->bind_param("sidsi", $pname, $catId, $price, $description, $pid);
        }

        if (!$stmt->execute()) {
            throw new Exception("Failed to update product.");
        }
        $stmt->close();

        // Replace all variants with the submitted set
        $del = $conn->prepare("DELETE FROM product_variant WHERE pid = ?");
        $del->bind_param("i", $pid);
        $del->execute();
        $del->close();

        if (empty($variants)) {
            $stock = isset($_POST["stock"]) ? (int)$_POST["stock"] : 0;
            $vStmt = $conn->prepare(
                "INSERT INTO product_variant (pid, color, size, color_hex, stock) VALUES (?, NULL, NULL, NULL, ?)"
            );
            $vStmt->bind_param("ii", $pid, $stock);
            if (!$vStmt->execute()) {
                throw new Exception("Failed to save stock.");
            }
            $vStmt->close();
        } else {
            $vStmt = $conn->prepare(
                "INSERT INTO product_variant (pid, color, size, color_hex, stock) VALUES (?, ?, ?, ?, ?)"
            );
            foreach ($variants as $v) {
                // already trimmed / normalised / validated by cleanVariants()
                $color = $v["color"];
                $size = $v["size"];
                $colorHex = $v["color_hex"];
                $stock = $v["stock"];

                $vStmt->bind_param("isssi", $pid, $color, $size, $colorHex, $stock);
                if (!$vStmt->execute()) {
                    throw new Exception("Failed to save one or more variants (duplicate color/size combination?).");
                }
            }
            $vStmt->close();
        }

        $conn->commit();
        echo json_encode(["success" => true, "message" => "Product updated successfully."]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }

    $conn->close();
?>
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

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

    $variants = json_decode($variantsRaw, true);
    if (!is_array($variants)) {
        $variants = [];
    }

    $newImageData = null;

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
                $color = isset($v["color"]) && $v["color"] !== "" ? trim($v["color"]) : null;
                $size = isset($v["size"]) && $v["size"] !== "" ? trim($v["size"]) : null;
                $colorHex = isset($v["color_hex"]) && $v["color_hex"] !== "" ? trim($v["color_hex"]) : null;
                $stock = isset($v["stock"]) ? (int)$v["stock"] : 0;

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
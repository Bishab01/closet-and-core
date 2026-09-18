<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    // Sent as multipart/form-data (needed for the image file), so we read $_POST / $_FILES, not php://input
    $pname = trim($_POST["pname"] ?? "");
    $catId = trim($_POST["cat_id"] ?? "");
    $price = trim($_POST["price"] ?? "");
    $description = trim($_POST["description"] ?? "");
    $variantsRaw = $_POST["variants"] ?? "[]";

    if (empty($pname) || empty($catId) || $price === "") {
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

    // Image is required for a new product
    if (!isset($_FILES["image"]) || $_FILES["image"]["error"] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "A product image is required."]);
        exit;
    }

    $allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $_FILES["image"]["tmp_name"]);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        echo json_encode(["success" => false, "message" => "Image must be JPG, PNG or WEBP."]);
        exit;
    }

    if ($_FILES["image"]["size"] > 4 * 1024 * 1024) { // 4MB cap
        echo json_encode(["success" => false, "message" => "Image must be smaller than 4MB."]);
        exit;
    }

    $imageData = file_get_contents($_FILES["image"]["tmp_name"]);

    // Make sure the category actually exists
    $catCheck = $conn->prepare("SELECT cat_id FROM category WHERE cat_id = ?");
    $catCheck->bind_param("i", $catId);
    $catCheck->execute();
    if ($catCheck->get_result()->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Selected category does not exist."]);
        exit;
    }
    $catCheck->close();

    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare(
            "INSERT INTO products (pname, cat_id, price, pimg, description) VALUES (?, ?, ?, ?, ?)"
        );
        $null = null;
        $stmt->bind_param("sidbs", $pname, $catId, $price, $null, $description);
        $stmt->send_long_data(3, $imageData);

        if (!$stmt->execute()) {
            throw new Exception("Failed to save product.");
        }

        $pid = $stmt->insert_id;
        $stmt->close();

        // No variants supplied -> create one default "one size" variant so the product still tracks stock
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
                $color = isset($v["color"]) && $v["color"] !== "" ? strtolower(trim($v["color"])) : null;
                $size  = isset($v["size"])  && $v["size"]  !== "" ? strtoupper(trim($v["size"]))  : null;
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

        echo json_encode([
            "success" => true,
            "message" => "Product added successfully.",
            "pid" => $pid
        ]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }

    $conn->close();
?>
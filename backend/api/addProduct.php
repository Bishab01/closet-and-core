<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");
    include("../config/variantValidation.php");

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

    //no two variants with the same color + size
    [$variants, $variantError] = cleanVariants($variants);
    if ($variantError !== null) {
        echo json_encode(["success" => false, "message" => $variantError]);
        exit;
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
    $imageHash = hash("sha256", $imageData);

    // Make sure the category actually exists
    $catCheck = $conn->prepare("SELECT cat_id FROM category WHERE cat_id = ?");
    $catCheck->bind_param("i", $catId);
    $catCheck->execute();
    if ($catCheck->get_result()->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Selected category does not exist."]);
        exit;
    }
    $catCheck->close();

    // Check 1: product name must be unique
    $nameStmt = $conn->prepare("SELECT pid FROM products WHERE pname = ? LIMIT 1");
    $nameStmt->bind_param("s", $pname);
    $nameStmt->execute();
    if ($nameStmt->get_result()->num_rows > 0) {
        $nameStmt->close();
        echo json_encode(["success" => false, "message" => "A product with this name already exists."]);
        exit;
    }
    $nameStmt->close();

    // Check 2: product image must be unique
    $imgStmt = $conn->prepare("SELECT pid FROM products WHERE SHA2(pimg, 256) = ? LIMIT 1");
    $imgStmt->bind_param("s", $imageHash);
    $imgStmt->execute();
    if ($imgStmt->get_result()->num_rows > 0) {
        $imgStmt->close();
        echo json_encode(["success" => false, "message" => "This image is already used by another product."]);
        exit;
    }
    $imgStmt->close();

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
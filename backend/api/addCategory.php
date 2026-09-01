<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        echo json_encode(["success" => false, "message" => "Invalid request body."]);
        exit;
    }

    $catName = trim($data["cat_name"] ?? "");

    if (empty($catName)) {
        echo json_encode(["success" => false, "message" => "Category name is required."]);
        exit;
    }

    // Reuse the category if it already exists (case-insensitive) instead of erroring out
    $check = $conn->prepare("SELECT cat_id, cat_name FROM category WHERE LOWER(cat_name) = LOWER(?)");
    $check->bind_param("s", $catName);
    $check->execute();
    $existing = $check->get_result()->fetch_assoc();
    $check->close();

    if ($existing) {
        echo json_encode([
            "success" => true,
            "message" => "Category already exists.",
            "category" => [
                "cat_id" => (int)$existing["cat_id"],
                "cat_name" => $existing["cat_name"]
            ]
        ]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO category (cat_name) VALUES (?)");
    $stmt->bind_param("s", $catName);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Category added.",
            "category" => [
                "cat_id" => $stmt->insert_id,
                "cat_name" => $catName
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add category."]);
    }

    $stmt->close();
    $conn->close();
?>
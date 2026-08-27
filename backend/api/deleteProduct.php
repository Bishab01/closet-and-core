<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data) || empty($data["pid"])) {
        echo json_encode(["success" => false, "message" => "Product id is required."]);
        exit;
    }

    $pid = (int)$data["pid"];

    // product_variant rows are removed automatically via ON DELETE CASCADE
    $stmt = $conn->prepare("DELETE FROM products WHERE pid = ?");
    $stmt->bind_param("i", $pid);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Product deleted."]);
        } else {
            echo json_encode(["success" => false, "message" => "Product not found."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete product."]);
    }

    $stmt->close();
    $conn->close();
?>
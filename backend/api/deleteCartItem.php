<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data) || empty($data["id"])) {
        echo json_encode(["success" => false, "message" => "Cart item id is required."]);
        exit;
    }

    $cid = (int)$data["id"];

    $stmt = $conn->prepare("DELETE FROM cart_items WHERE cid = ?");
    $stmt->bind_param("i", $cid);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Cart item deleted."]);
        } else {
            echo json_encode(["success" => false, "message" => "Cart item not found."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete cart item."]);
    }

    $stmt->close();
    $conn->close();
?>
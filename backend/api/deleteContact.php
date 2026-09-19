<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data) || empty($data["id"])) {
        echo json_encode(["success" => false, "message" => "Contact detail id is required."]);
        exit;
    }

    $id = (int)$data["id"];

    $stmt = $conn->prepare("DELETE FROM retailer_contacts WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Contact details deleted."]);
        } else {
            echo json_encode(["success" => false, "message" => "Contact details not found."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete contact details."]);
    }

    $stmt->close();
    $conn->close();
?>
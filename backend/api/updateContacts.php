<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["retailer"]);

    $data = json_decode(file_get_contents("php://input"), true);

    // guard against malformed/missing JSON body entirely
    if (!is_array($data)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid request body."
        ]);
        exit;
    }

    // guard against missing keys in an otherwise-valid JSON body
    $id = isset($data["id"]) ? (int)$data["id"] : "";
    $platform = isset($data["platform"]) ? strtolower(trim($data["platform"])) : "";
    $handle   = isset($data["handle"]) ? trim($data["handle"]) : "";

    if ($platform === "" || $handle === "") {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit;
    }

    // server-side format validation, mirroring the frontend
    $allowedPlatforms = ["instagram", "whatsapp", "phone", "email"];

    if (!in_array($platform, $allowedPlatforms)) {
        echo json_encode([
            "success" => false,
            "message" => "Platform not supported."
        ]);
        exit;
    }

    if ($platform === "instagram") {
        if (!preg_match('/^[a-zA-Z0-9._]{1,30}$/', $handle)) {
            echo json_encode([
                "success" => false,
                "message" => "Username can only contain letters, numbers, . and _."
            ]);
            exit;
        }
    }

    if ($platform === "whatsapp" || $platform === "phone") {
        if (!preg_match('/^9\d{9}$/', $handle)) {
            echo json_encode([
                "success" => false,
                "message" => "Invalid phone number."
            ]);
            exit;
        }
    }

    if ($platform === "email") {
        if (!filter_var($handle, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                "success" => false,
                "message" => "Invalid email address."
            ]);
            exit;
        }
    }

    try {
        $stmt = $conn->prepare("UPDATE retailer_contacts SET platform = ?, handle = ? WHERE id = ?");
        $stmt->bind_param("ssi", $platform, $handle, $id);
        $stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Contact details updated successfully."
        ]);
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() === 1062) {
                echo json_encode([
                    "success" => false,
                    "message" => "Contact details for this platform already exists."
                ]);
            } else {
                error_log($e->getMessage());
                echo json_encode([
                    "success" => false,
                    "message" => "Failed to update contact details."
                ]);
            }
        } finally {
            $stmt->close();
    }
    $conn->close();
?>
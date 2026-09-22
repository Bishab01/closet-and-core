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
    $platform = isset($data["platform"]) ? strtolower(trim($data["platform"])) : "";
    $handle   = isset($data["handle"]) ? trim($data["handle"]) : "";

    if ($platform === "" || $handle === "") {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit;
    }

    // get the logged-in retailer's user id from the session
    $uid = $_SESSION['uid'] ?? null;

    if (!$uid) {
        echo json_encode([
            "success" => false,
            "message" => "Unauthorized user."
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
        $stmt = $conn->prepare("INSERT INTO retailer_contacts (uid, platform, handle) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $uid, $platform, $handle);
        $stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Contact details saved successfully."
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
                "message" => "Failed to save contact details."
            ]);
        }
    } finally {
        $stmt->close();
    }
    $conn->close();
?>
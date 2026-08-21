<?php
    include("../config/cors.php"); 
    include("../config/connectDB.php");
    include("../config/session.php");
    
    $data = json_decode(file_get_contents("php://input"),true);

    // the parameter inside $data[""] should match the key of the object that was json stringify and sent
    $oldPass = trim($data["oldPass"]);
    $newPass = trim($data["newPass"]);
    $rePass = trim($data["rePass"]);

    $uid = $_SESSION['uid'];

    //check if any field is empty
    if (empty($oldPass) || empty($newPass) || empty($rePass)) {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit;
    }

    //validate password length
    if (strlen($newPass) < 8) {
        echo json_encode([
            "success" => false,
            "message" => "Password must be at least 8 characters."
        ]);
        exit;
    }

    if ($newPass !== $rePass) {
        echo json_encode([
            "success" => false,
            "message" => "Re-enterd password doesn't match"
        ]);
        exit;
    }

    //check old password
    $check = $conn->prepare ("SELECT password FROM users WHERE uid = ?");
    $check->bind_param("i", $uid);
    $check->execute();

    $result = $check->get_result();
    $user = $result->fetch_assoc();

    if (!password_verify($oldPass, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect password"
        ]);
        exit;
    }

    $check->close();

    //hash the password
    $hashedPassword = password_hash($newPass, PASSWORD_DEFAULT);   

    // Insert new password
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE uid = ?");
    $stmt->bind_param("si", $hashedPassword, $uid);

    //return JSON response
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Password changed successfully."
        ]);
    } 
    else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to change password."
        ]);
    }

    $stmt->close();
    $conn->close();

?>
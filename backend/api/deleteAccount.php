<?php
    include("../config/cors.php"); 
    include("../config/connectDB.php");
    include("../config/session.php");
    
    $uid = $_SESSION['uid'];  

    // delete user
    $stmt = $conn->prepare("DELETE FROM users WHERE uid = ?");
    $stmt->bind_param("i", $uid);
    $stmt->execute();

    if ($stmt->execute()) {
        $_SESSION = [];
        session_destroy();

        echo json_encode([
            "success" => true,
            "message" => "Account deleted successfully"
            ]);
    } 
    else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to delete account"
        ]);
    }

    $stmt->close();
    $conn->close();
?>
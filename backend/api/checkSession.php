<?php
    include("../config/cors.php"); 
    include("../config/session.php");

    if (isset($_SESSION["uid"])) {
        echo json_encode([
            "success" => true,
            "loggedIn" => true,
            "user" => [
                "uid" => $_SESSION["uid"],
                "email" => $_SESSION["email"],
                "role" => $_SESSION["role"]
            ]
        ]);
    } 
    
    else {
        echo json_encode([
            "success" => true,
            "loggedIn" => false
        ]);
    }
?>
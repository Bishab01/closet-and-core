<?php
    include("../config/cors.php"); 
    include("../config/session.php");

    $_SESSION = [];
    session_destroy();

    echo json_encode([
        "success" => true,
        "message" => "Logged out"
    ]);
?>
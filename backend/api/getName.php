<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");

    $uid = $_SESSION['uid'];

    $stmt = $conn->prepare("SELECT fname, lname FROM users WHERE uid = ?");
    $stmt->bind_param("i", $uid);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
 
    if (!$user) {
        echo json_encode([
            "success" => false, 
            "message" => "User not found."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Item added to cart successfully.",
        "fname" => $user["fname"],
        "lname" => $user["lname"],
    ]);

    $stmt->close();
    $conn->close();
?>
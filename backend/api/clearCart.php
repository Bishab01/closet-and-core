<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);
    
    $uid = $_SESSION['uid'];

    $stmt = $conn->prepare("DELETE FROM cart_items WHERE uid = ?");
    $stmt->bind_param("i", $uid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Cart items cleared."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to clear cart items."]);
    }

    $stmt->close();
    $conn->close();
?>
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);

    $uid = $_SESSION['uid'];
    $data = json_decode(file_get_contents("php://input"), true);

    $vid = (int)($data["vid"] ?? 0);
    $quantity = isset($data["quantity"]) ? (int)$data["quantity"] : 1;

    if ($vid <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid product varient id."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT stock FROM product_variant WHERE vid = ?");
    $stmt->bind_param("i", $vid);
    $stmt->execute();
    $variant = $stmt->get_result()->fetch_assoc();
    $stmt->close();
 
    if (!$variant) {
        echo json_encode(["success" => false, "message" => "Variant not found."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT cid, quantity FROM cart_items WHERE uid = ? AND vid = ?");
    $stmt->bind_param("ii", $uid, $vid);
    $stmt->execute();
    $existing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
 
    $newQuantity = $existing ? $existing["quantity"] + $quantity : $quantity;
 
    if ($newQuantity > $variant["stock"]) {
        echo json_encode([
            "success" => false,
            "message" => "Only " . $variant["stock"] . " left in stock."
        ]);
        exit;
    }
 
    if ($existing) {
        $cid = $existing["cid"];
        $stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE cid = ?");
        $stmt->bind_param("ii", $newQuantity, $cid);
    } else {
        $stmt = $conn->prepare("INSERT INTO cart_items (uid, vid, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $uid, $vid, $newQuantity);
    }
    
    if (!$stmt->execute()) {
        echo json_encode([
            "success" => false, 
            "message" => "Failed to add item to cart."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Item added to cart successfully.",
    ]);

    $stmt->close();
    $conn->close();
?>
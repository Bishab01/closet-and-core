<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);

    $uid = $_SESSION["uid"];
    $data = json_decode(file_get_contents("php://input"), true);
    $cid = (int)($data["cid"] ?? 0);
    $quantity = (int)($data["quantity"] ?? 0);

    if ($cid <= 0) {
        echo json_encode(["success" => false, "message" => "Invalid cart item id."]);
        exit;
    }

    if ($quantity <= 0) {
        echo json_encode(["success" => false, "message" => "Quantity must be at least 1."]);
        exit;
    }

    $stmt = $conn->prepare(
        "SELECT pv.stock
         FROM cart_items ci
         INNER JOIN product_variant pv ON pv.vid = ci.vid
         WHERE ci.cid = ? AND ci.uid = ?"
    );
    $stmt->bind_param("ii", $cid, $uid);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$row) {
        echo json_encode(["success" => false, "message" => "Cart item not found."]);
        exit;
    }

    if ($quantity > $row["stock"]) {
        echo json_encode([
            "success" => false,
            "message" => "Only " . $row["stock"] . " left in stock."
        ]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE cid = ? AND uid = ?");
    $stmt->bind_param("iii", $quantity, $cid, $uid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Cart updated."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update cart."]);
    }

    $stmt->close();
    $conn->close();
?>
<?php
    include("../config/cors.php");
    include("../config/session.php");
    include("../config/connectDB.php");
    include("../config/requireRole.php");

    requireRole(["customer"]);

    $uid = $_SESSION["uid"];

    $stmt = $conn->prepare(
        "SELECT ci.cid, ci.quantity,
            p.pid, p.pname, p.price,
            pv.color, pv.size, pv.color_hex,
            c.cat_name
        FROM cart_items ci
        INNER JOIN product_variant pv ON pv.vid = ci.vid
        INNER JOIN products p ON p.pid = pv.pid
        LEFT JOIN category c ON c.cat_id = p.cat_id
        WHERE ci.uid = ?
        ORDER BY ci.added_at DESC"
    );

    $stmt->bind_param("i", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = [
            "cid" => (int)$row["cid"],
            "pid" => (int)$row["pid"],
            "pname" => $row["pname"],
            "category" => $row["cat_name"],
            "price" => (float)$row["price"],
            "color" => $row["color"],
            "size" => $row["size"],
            "colorHex" => $row["color_hex"],
            "quantity" => (int)$row["quantity"]
        ];
    }

    echo json_encode([
        "success" => true,
        "items" => $items
    ]);

    $stmt->close();
    $conn->close();
?>
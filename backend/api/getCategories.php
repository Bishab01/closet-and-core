<?php
    include("../config/cors.php");
    include("../config/connectDB.php");

    $result = $conn->query("SELECT cat_id, cat_name FROM category ORDER BY cat_name ASC");

    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = [
            "cat_id" => (int)$row["cat_id"],
            "cat_name" => $row["cat_name"]
        ];
    }

    echo json_encode([
        "success" => true,
        "categories" => $categories
    ]);

    $conn->close();
?>
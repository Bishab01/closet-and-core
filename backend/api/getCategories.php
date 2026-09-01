<?php
    include("../config/cors.php"); 
    include("../config/session.php");
    include("../config/connectDB.php"); 

    //get categories
    $stmt = $conn->prepare ("SELECT * FROM category");
    $stmt->execute();
    $result = $stmt->get_result(); //will return the columns asked by the query

    if($result->num_rows <= 0){
        echo json_encode([
            "success" => false,
            "message" => "No categories found."
        ]);
        exit;
    }

    $categories = [];

    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }

    echo json_encode([
        "success" => true,
        "categories" => $categories
    ]);

    $stmt->close();
    $conn->close();
?>
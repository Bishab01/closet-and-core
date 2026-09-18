<?php
    include("../config/cors.php"); 
    include("../config/session.php");
    include("../config/connectDB.php"); 

    //get contacts
    $stmt = $conn->prepare ("SELECT id, platform, handle FROM retailer_contacts");
    $stmt->execute();
    $result = $stmt->get_result(); //will return the columns asked by the query

    if($result->num_rows <= 0){
        echo json_encode([
            "success" => false,
            "message" => "No contact details found."
        ]);
        exit;
    }

    $contacts = [];

    while ($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }

    echo json_encode([
        "success" => true,
        "contacts" => $contacts
    ]);

    $stmt->close();
    $conn->close();
?>
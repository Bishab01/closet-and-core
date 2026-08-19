<?php
    //CORS and response headers, allows only post method from the specified localhost. the content should be in json format
    include("../config/cors.php"); 

    include("../config/connectDB.php"); //establishing connection with database

    // read json request body sent from the frontend and decode it into an associative array  
    $data = json_decode(file_get_contents("php://input"),true);

    // the parameter inside $data[""] should match the key of the object that was json stringify and sent
    $fname = trim($data["fname"]);
    $lname = trim($data["lname"]);
    $password = trim($data["password"]);
    $email = trim($data["email"]);

    //check if any field is empty
    if (empty($fname) || empty($lname) || empty($email) || empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit;
    }

    //validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email format."
        ]);
        exit;
    }

    //validate password length
    if (strlen($password) < 8) {
        echo json_encode([
            "success" => false,
            "message" => "Password must be at least 8 characters."
        ]);
        exit;
    }

    //check if the email already exists
    $check = $conn->prepare ("SELECT uid FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if($result->num_rows > 0){
        echo json_encode([
            "success" => false,
            "message" => "Email already exists"
        ]);
        exit;
    }

    $check->close();

    //hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);   
    $role = 'retailer'; //retailer or customer

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fname, $lname, $email, $hashedPassword, $role);

    //return JSON response
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Sign up successful."
        ]);
    } 
    else {
        echo json_encode([
            "success" => false,
            "message" => "Sign up failed."
        ]);
    }

    $stmt->close();
    $conn->close();

?>
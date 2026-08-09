<?php
    include("../config/cors.php"); 
    include("../config/session.php");
    include("../config/connectDB.php"); 

    //$data is an associative array of the json sent from frontend
    $data = json_decode(file_get_contents("php://input"),true);

    // guard against malformed/missing JSON body entirely
    if (!is_array($data)) {
        echo json_encode([
            "success" => false, 
            "message" => "Invalid request body."
        ]);
        exit;
    }

    $email = trim($data["email"]);
    $password = trim($data["password"]);

    //check if any field is empty
    if (empty($email) || empty($password)) {
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
    $check = $conn->prepare ("SELECT * FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result(); //will return the colums asked by the query

    if($result->num_rows <= 0){
        echo json_encode([
            "success" => false,
            "message" => "Incorrect email or password"
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Incorrect email or password"
        ]);
        exit;
    }

    // Regenerate session ID on login to prevent session fixation
    session_regenerate_id(true);

    $_SESSION["uid"]      = $user["uid"];
    $_SESSION["fname"]    = $user["fname"];
    $_SESSION["lname"]    = $user["lname"];
    $_SESSION["email"]    = $user["email"];
    $_SESSION["role"]     = $user["role"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "uid" => $user["uid"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);

    $check->close();
    $conn->close();
?>
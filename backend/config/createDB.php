<?php
//connecting to root and creating database
$host = "localhost";
$user = "root";
$password = "";

$conn = new mysqli ( $host, $user, $password);

if($conn->connect_error){
    die ("Connection failed: " . $conn->connect_error);
}

else{
    echo "Connected successfully!";
}

$sql = "CREATE DATABASE IF NOT EXISTS onlinestore";

if($conn->query($sql) === TRUE){
    echo "<br>Database created successfully";
}

else {
    echo "<br>Error creating database: ". $conn->error;
}

$conn->close(); //closing the connection to the root
?>
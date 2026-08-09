<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(20) NOT NULL,
  lname VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('retailer', 'customer') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY email_UNIQUE (email ASC)
)";

if($conn->query($sql) === TRUE){
    echo "Users table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
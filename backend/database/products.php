<?php
//creation of product table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS products (
    pid INT(10) AUTO_INCREMENT PRIMARY KEY,
    pname VARCHAR(40) NOT NULL,
    category VARCHAR(15) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    pimg MEDIUMBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if($conn->query($sql) === TRUE){
    echo "Products table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS category (
  cat_id INT AUTO_INCREMENT PRIMARY KEY,
  cat_name VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY cat_name_UNIQUE (cat_name ASC)
)";

if($conn->query($sql) === TRUE){
    echo "Category table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
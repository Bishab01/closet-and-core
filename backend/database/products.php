<?php
//creation of product table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS products (
  pid INT AUTO_INCREMENT PRIMARY KEY,
  pname VARCHAR(40) NOT NULL,
  cat_id INT NULL,
  price DECIMAL(10,2) NOT NULL,
  pimg MEDIUMBLOB NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY fk_products_category_idx (cat_id ASC),
  CONSTRAINT fk_products_category
    FOREIGN KEY (cat_id)
    REFERENCES category (cat_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
)";

if($conn->query($sql) === TRUE){
    echo "Products table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
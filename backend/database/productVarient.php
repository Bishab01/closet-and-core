<?php
//creation of product table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS product_variant (
  vid INT AUTO_INCREMENT PRIMARY KEY,
  pid INT NOT NULL,
  color VARCHAR(20) NULL,
  size VARCHAR(10) NULL,
  color_hex VARCHAR(10) NULL,
  stock INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_variant_products
    FOREIGN KEY (pid)
    REFERENCES products (pid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE KEY product_variant_UNIQUE (pid, color, size)
)";

if($conn->query($sql) === TRUE){
    echo "Product varient table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
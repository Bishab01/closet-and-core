<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS cart_items (
  cid INT AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  vid INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cart_users
    FOREIGN KEY (uid)
    REFERENCES users (uid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_cart_variant
    FOREIGN KEY (vid)
    REFERENCES product_variant (vid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)";

if($conn->query($sql) === TRUE){
    echo "Cart items table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
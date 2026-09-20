<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  oid INT NOT NULL,
  vid INT NOT NULL,
  pname_snapshot VARCHAR(40) NOT NULL,
  size_snapshot VARCHAR(10) NULL,
  color_snapshot VARCHAR(20) NULL,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_orderItems_orders
    FOREIGN KEY (oid)
    REFERENCES orders (oid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_orderItems_variant
    FOREIGN KEY (vid)
    REFERENCES product_variant (vid)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)";

if($conn->query($sql) === TRUE){
    echo "Order items table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
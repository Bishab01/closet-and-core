<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS orders (
  oid INT AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  payment_method ENUM('cod', 'esewa', 'khalti') NOT NULL,
  payment_status ENUM('paid', 'unpaid') NOT NULL DEFAULT 'unpaid',
  status ENUM('pending', 'processing', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  delivery_address VARCHAR(255) NOT NULL,
  contact_number VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_users
    FOREIGN KEY (uid)
    REFERENCES users (uid)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)";

if($conn->query($sql) === TRUE){
    echo "Orders table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
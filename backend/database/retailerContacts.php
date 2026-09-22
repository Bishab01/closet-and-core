<?php
//creation of table in the connected database

include("../config/connectDB.php"); //establishing connection to the database

$sql = "CREATE TABLE IF NOT EXISTS retailer_contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  platform ENUM('instagram', 'whatsapp', 'email', 'phone') NOT NULL,
  handle VARCHAR(150) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_retailer_contacts_users
    FOREIGN KEY (uid) REFERENCES users(uid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE KEY uid_title_UNIQUE (uid, platform)
)";

if($conn->query($sql) === TRUE){
    echo "Retailer Contacts table created successfully";
}

else {
    echo "Error creating table: ". $conn->error;
}

$conn->close(); //closing the connection to the database
?>
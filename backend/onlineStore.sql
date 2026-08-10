-- =========================================================
-- onlineStore schema
-- Cleaned for import via PHP (mysqli / PDO)
-- =========================================================

CREATE DATABASE IF NOT EXISTS onlinestore
  DEFAULT CHARACTER SET = utf8mb4
  DEFAULT COLLATE = utf8mb4_0900_ai_ci;

USE onlinestore;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table category
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS category (
  cat_id INT AUTO_INCREMENT PRIMARY KEY,
  cat_name VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY cat_name_UNIQUE (cat_name)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table products
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  pid INT AUTO_INCREMENT PRIMARY KEY,
  pname VARCHAR(40) NOT NULL,
  cat_id INT NULL,
  price DECIMAL(10,2) NOT NULL,
  pimg MEDIUMBLOB NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (cat_id)
    REFERENCES category (cat_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(20) NOT NULL,
  lname VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('retailer', 'customer') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY email_UNIQUE (email)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table product_variant
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS product_variant (
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
    ON UPDATE CASCADE
  UNIQUE KEY product_variant_UNIQUE (pid, color, size)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table cart
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cart (
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
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table orders
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  oid INT AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  payment_method ENUM('cod', 'eSewa') NOT NULL,
  payment_status ENUM('paid', 'unpaid') NOT NULL DEFAULT 'unpaid',
  status ENUM('pending', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  delivery_address VARCHAR(255) NOT NULL,
  contact_number VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_users
    FOREIGN KEY (uid)
    REFERENCES users (uid)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table order_items
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
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
) ENGINE = InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
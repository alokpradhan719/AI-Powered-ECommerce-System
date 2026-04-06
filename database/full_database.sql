-- Combined schema + sample data for ecommerce_analytics
-- Run this single file to DROP/CREATE the database and insert sample rows.

DROP DATABASE IF EXISTS ecommerce_analytics;
CREATE DATABASE ecommerce_analytics;
USE ecommerce_analytics;

-- TABLES
CREATE TABLE CUSTOMERS (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200),
  phone VARCHAR(50),
  region VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ADDRESSES (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(30),
  country VARCHAR(100),
  is_billing BOOLEAN DEFAULT FALSE,
  is_shipping BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)
);

CREATE TABLE CATEGORIES (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE SUPPLIERS (
  supplier_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  contact_email VARCHAR(200),
  phone VARCHAR(50)
);

CREATE TABLE PRODUCTS (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(100) UNIQUE,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  supplier_id INT,
  price DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id),
  FOREIGN KEY (supplier_id) REFERENCES SUPPLIERS(supplier_id)
);

CREATE TABLE INVENTORY (
  inventory_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  stock INT DEFAULT 0,
  reorder_level INT DEFAULT 0,
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

CREATE TABLE ORDERS (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  billing_address_id INT,
  shipping_address_id INT,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  order_date DATETIME NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id),
  FOREIGN KEY (billing_address_id) REFERENCES ADDRESSES(address_id),
  FOREIGN KEY (shipping_address_id) REFERENCES ADDRESSES(address_id)
);

CREATE TABLE ORDER_ITEMS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES ORDERS(order_id),
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

CREATE TABLE PAYMENTS (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(50),
  paid_at DATETIME,
  FOREIGN KEY (order_id) REFERENCES ORDERS(order_id)
);

CREATE TABLE SHIPMENTS (
  shipment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  shipped_date DATETIME,
  carrier VARCHAR(100),
  tracking_number VARCHAR(200),
  status VARCHAR(50),
  FOREIGN KEY (order_id) REFERENCES ORDERS(order_id)
);

CREATE TABLE REVIEWS (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  customer_id INT,
  rating TINYINT,
  title VARCHAR(200),
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id),
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)
);

CREATE TABLE COUPONS (
  coupon_id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  discount_percent INT,
  expires_at DATETIME
);

CREATE TABLE RETURNS (
  return_id INT AUTO_INCREMENT PRIMARY KEY,
  order_item_id INT NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'requested',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_item_id) REFERENCES ORDER_ITEMS(id)
);

CREATE TABLE CARTS (
  cart_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)
);

CREATE TABLE CART_ITEMS (
  cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cart_id) REFERENCES CARTS(cart_id),
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

-- Indexes for performance
CREATE INDEX idx_orders_order_date ON ORDERS(order_date);
CREATE INDEX idx_orders_customer ON ORDERS(customer_id);
CREATE INDEX idx_order_items_product ON ORDER_ITEMS(product_id);
CREATE INDEX idx_products_category ON PRODUCTS(category_id);
CREATE INDEX idx_inventory_product ON INVENTORY(product_id);

-- SAMPLE DATA

-- Sample customers
INSERT INTO CUSTOMERS (customer_id, name, email, phone, region) VALUES
(1, 'Alice Johnson', 'alice@example.com', '555-0100', 'North'),
(2, 'Bob Smith', 'bob@example.com', '555-0110', 'West'),
(3, 'Carla Gomez', 'carla@example.com', '555-0120', 'East'),
(4, 'Daniel Lee', 'daniel@example.com', '555-0130', 'South');

-- Addresses
INSERT INTO ADDRESSES (address_id, customer_id, street, city, state, postal_code, country, is_billing, is_shipping) VALUES
(1,1,'123 Maple St','Springfield','IL','62701','USA', TRUE, TRUE),
(2,1,'456 Oak Ave','Springfield','IL','62702','USA', FALSE, TRUE),
(3,2,'789 Pine Rd','Rivertown','CA','90210','USA', TRUE, TRUE),
(4,3,'12 Sunset Blvd','Metropolis','NY','10001','USA', TRUE, TRUE),
(5,4,'99 Harbor St','Lakeside','FL','32003','USA', TRUE, TRUE);

-- Categories
INSERT INTO CATEGORIES (category_id, name, description) VALUES
(1,'Electronics','Electronic devices and accessories'),
(2,'Clothing','Apparel and garments'),
(3,'Home','Home & Kitchen');

-- Suppliers
INSERT INTO SUPPLIERS (supplier_id, name, contact_email, phone) VALUES
(1,'Acme Electronics','sales@acme.example','555-1000'),
(2,'HomeGoods Inc','supply@homegoods.example','555-2000');

-- Products
INSERT INTO PRODUCTS (product_id, sku, name, category_id, supplier_id, price) VALUES
(1, 'SKU001', 'Wireless Headphones',1,1,99.99),
(2, 'SKU002', 'Bluetooth Speaker',1,1,49.99),
(3, 'SKU003', 'Cotton T-Shirt',2,2,14.99),
(4, 'SKU004', 'Ceramic Mug',3,2,9.99),
(5, 'SKU005', 'USB-C Charger',1,1,19.99),
(6, 'SKU006', 'Throw Pillow',3,2,24.99);

-- Inventory
INSERT INTO INVENTORY (inventory_id, product_id, stock, reorder_level) VALUES
(1,1,50,10),
(2,2,80,20),
(3,3,200,50),
(4,4,150,30),
(5,5,120,30),
(6,6,60,15);

-- Coupons
INSERT INTO COUPONS (coupon_id, code, discount_percent, expires_at) VALUES
(1,'WELCOME10',10,'2026-12-31 23:59:59');

-- Carts
INSERT INTO CARTS (cart_id, customer_id) VALUES
(1,1),
(2,2);

-- Cart items
INSERT INTO CART_ITEMS (cart_item_id, cart_id, product_id, quantity) VALUES
(1,1,2,1),
(2,1,5,2),
(3,2,3,3);

-- Orders
INSERT INTO ORDERS (order_id, customer_id, billing_address_id, shipping_address_id, total_amount, status, order_date) VALUES
(1,1,1,2,199.99,'completed','2025-12-05 10:15:00'),
(2,2,3,3,199.98,'completed','2025-12-06 11:20:00'),
(3,3,4,4,29.99,'completed','2025-12-07 12:30:00'),
(4,4,5,5,99.98,'processing','2025-12-08 09:45:00');

-- Order items
INSERT INTO ORDER_ITEMS (id, order_id, product_id, unit_price, quantity) VALUES
(1,1,1,99.99,1),
(2,1,2,49.99,2),
(3,2,2,49.99,2),
(4,3,3,14.99,2),
(5,4,4,9.99,2);

-- Payments
INSERT INTO PAYMENTS (payment_id, order_id, amount, method, status, paid_at) VALUES
(1,1,199.99,'card','completed','2025-12-05 10:16:00'),
(2,2,199.98,'card','completed','2025-12-06 11:21:00'),
(3,3,29.99,'paypal','completed','2025-12-07 12:31:00');

-- Shipments
INSERT INTO SHIPMENTS (shipment_id, order_id, shipped_date, carrier, tracking_number, status) VALUES
(1,1,'2025-12-06 08:00:00','UPS','1Z999AA10123456784','delivered'),
(2,2,'2025-12-07 09:00:00','FedEx','999999999999','delivered');

-- Reviews
INSERT INTO REVIEWS (review_id, product_id, customer_id, rating, title, body) VALUES
(1,1,1,5,'Great headphones','Sound quality is excellent for the price'),
(2,4,4,4,'Nice mug','Good size and finish');

-- Returns
INSERT INTO RETURNS (return_id, order_item_id, reason, status) VALUES
(1,2,'Wrong color','processed');

COMMIT;

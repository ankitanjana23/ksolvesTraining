create database userManagement
Inside this created two table users , products
users table containe id , name , email , age
products table containe id , name ,description ,price, stock , created_at, updated_at 
unique -> (name , description,price,stock )  --id auto increment and created , updated auto created 

CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,description TEXT,price DECIMAL(10, 2) NOT NULL,stock INT NOT NULL DEFAULT 0,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP); 

INSERT INTO products (name, description, price, stock)
VALUES ('Laptop', 'High-performance laptop for gaming and work', 1299.99, 10);

//Alter table and add foregin key
ALTER TABLE products ADD user_id INT NOT NULL;
ALTER TABLE products ADD FOREIGN KEY (user_id) REFERENCES users(id);
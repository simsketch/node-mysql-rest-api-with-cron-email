-- Create the database
CREATE DATABASE coding_challenge;

-- Use the database 
USE coding_challenge;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed the users table with initial data
INSERT INTO users (name, email, created_at)
VALUES
  ('John Doe', 'john.doe@example.com', '2023-05-01 00:00:00'),
  ('Jane Smith', 'jane.smith@example.com', '2023-05-02 00:00:00'),
  ('Bob Johnson', 'bob.johnson@example.com', '2023-05-03 00:00:00');
CREATE DATABASE mydatabase;
use mydatabase;

CREATE TABLE IF NOT EXISTS todotable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

INSERT INTO todotable
  (title, completed)
VALUES
  ('Task1', FALSE),
  ('Task2', TRUE),  
  ('Task3', FALSE),
  ('Task4', TRUE);
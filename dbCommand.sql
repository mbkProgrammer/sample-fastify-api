-- \? => for get help

-- \l => for list database

-- CREATE DATABASE (name of database) => for create database

-- \c (name of database) => for connected to database

-- \d => list table

-- \d (name of table) => show table structure

-- ALTER TABLE (name of table) ADD COLUMN (name of COLUMN) (type and property) => for add column to table

-- ALTER TABLE (name of table) DROP COLUMN (name of COLUMN) => for delete column from table

-- DROP TABLE (name of table) => for delete table

-- DROP DATABASE (name of database) => for delete database

-- create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(63),
  content TEXT,
  category_id INT,
  image BYTEA,
  author VARCHAR(63),
  created_at TIMESTAMP
);

-- select all data from posts
SELECT * FROM posts;

-- select title and content column from posts
SELECT title, content FROM posts;

-- insert data to posts
INSERT INTO posts (title, content, category_id, image, author, created_at) VALUES (
  "title",
  "content",
  "category_id",
  "image",
  "athor",
  CURRENT_TIMESTAMP
);

DROP DATABASE IF EXIST test1;
CREATE DATABASE test1;
\c test1
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar (50) UNIQUE,
    password varchar (50) UNIQUE
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title text,
    content text,
    uploaded_at timestamp WITH TIME ZONE DEFAULT now()
);
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    imagesId integer,
    FOREIGN KEY (imagesId) REFERENCES posts(id),
    image varchar(10)
);
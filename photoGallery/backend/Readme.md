CREATE DATABASE photogallery   // \l  , \c datbase_name 

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    data BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

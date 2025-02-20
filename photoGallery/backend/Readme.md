CREATE DATABASE photogallery   // \l  , \c datbase_name 

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    data BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

checked error at last

Docker command to build 

sudo docker build -t backend .   // backend current directory where your Dockerfile exist 

. for current directory 

create docker postgres image 

docker-compose exec postgresdb psql -U postgres -d photogallery

const pool = require('../config/db')

const getAllImages = (pageName,pageSize,sort) =>{
    return pool.query(
        `SELECT id, filename FROM images ORDER BY id ${sort} LIMIT $2 OFFSET $1`,
        [pageName,pageSize]
      );
}

const uploadImage = (originalname,mimetype,buffer) =>{
    return pool.query(
        "INSERT INTO images (filename, type, data) VALUES ($1, $2, $3) RETURNING *",
        [originalname, mimetype, buffer]
      );
}

const deleteImage = (id) =>{
    return pool.query("DELETE FROM images WHERE id = $1", [id]);
}

const getImage = (id) =>{
    return pool.query("SELECT * FROM images WHERE id = $1", [id]);
}
module.exports = {getAllImages, uploadImage, deleteImage, getImage}
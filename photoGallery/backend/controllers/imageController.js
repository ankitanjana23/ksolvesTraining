const pool = require("../config/db");

// Get all images
const getAllImages = async (req, res) => {
  try {
    let { pageName = 1, pageSize = 6 , sort = "desc"} = req.query;
       pageName = (pageName-1)*pageSize;
       const images = await pool.query(
      `SELECT id, filename FROM images ORDER BY id ${sort} LIMIT $2 OFFSET $1`,
      [pageName,pageSize]
    );
    res.status(200).json(images.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error pagination ");
  }
};   

// Upload Image
const uploadImage = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    const result = await pool.query(
      "INSERT INTO images (filename, type, data) VALUES ($1, $2, $3) RETURNING *",
      [originalname, mimetype, buffer]
    );

    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
};

// Delete Image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM images WHERE id = $1", [id]);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting image");
  }
};

// Get single image
const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM images WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Image not found");
    }

    const image = result.rows[0];
    res.set("Content-Type", image.type);
    res.send(image.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image");
  }
};

//pagination user provide pageName , pageSize - contiane records

const pagination = async (req, res) => {};

module.exports = { getAllImages, uploadImage, deleteImage, getImage };

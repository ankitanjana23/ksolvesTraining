const imageService = require("../services/imageService");

// Get all images
const getAllImages = async (req, res, next) => {
  try {
    let { pageName, pageSize, sort } = req.data; //get data from pageValidation
    const images = await imageService.getAllImages(pageName, pageSize, sort);
    res.status(200).json(images.rows);
  } catch (err) {
    next(err);
    // console.error(err);
    // res.status(500).send("Error pagination ");
  }
};

// Upload Image
const uploadImage = async (req, res, next) => {
  try {
    //fieldname , originalname , encoding 7bit , mimetype , buffer
    const { originalname, mimetype, buffer } = req.file;
    const result = await imageService.uploadImage(
      originalname,
      mimetype,
      buffer
    );
    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Delete Image
const deleteImage = async (req, res, next) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const result = await imageService.deleteImage(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Get single image
const getImage = async (req, res, next) => {
  try {
    const image = req.image; //get data from middleware
    res.set("Content-Type", image.type);
    res.send(image.data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllImages, uploadImage, deleteImage, getImage };

const express = require("express");
const router = express.Router();
const { getAllImages, uploadImage, deleteImage, getImage } = require("../controllers/imageController");
const upload = require("../middlewares/upload");
const checkImageExists = require("../middlewares/checkImageExists")
const pageValidation = require('../middlewares/pageValidation')

router.post("/upload", upload.single("image"), uploadImage);
router.get("/images",pageValidation, getAllImages);
router.get("/image/:id",checkImageExists ,getImage);
router.delete("/image/:id",checkImageExists, deleteImage);


module.exports = router;

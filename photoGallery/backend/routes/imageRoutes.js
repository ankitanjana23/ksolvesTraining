const express = require("express");
const router = express.Router();
const { getAllImages, uploadImage, deleteImage, getImage } = require("../controllers/imageController");
const upload = require("../middlewares/upload");

router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getAllImages);
router.get("/image/:id", getImage);
router.delete("/image/:id", deleteImage);


module.exports = router;

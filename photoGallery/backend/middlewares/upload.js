const multer = require("multer");

const storage = multer.memoryStorage();  
const upload = multer({ storage });  //store image

module.exports = upload;
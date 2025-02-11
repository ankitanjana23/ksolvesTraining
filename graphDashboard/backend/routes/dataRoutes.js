const express = require('express');
const router = express.Router();
const { displayContent } = require('../controllers/dataControllers'); 

router.get('/', displayContent);

module.exports = router;

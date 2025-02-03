const express = require('express')
const {handleBlogCreation,approvedBlog} = require('../controllers/userController')
const { authenticateToken, isAdmin ,isUser} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/blogs',authenticateToken,isUser,approvedBlog);
router.post('/blog',authenticateToken,isUser,handleBlogCreation);

module.exports = router;
const express = require('express')
const {handleBlogCreation,approvedBlog,approvedBlogSelect, handleComments , displayComments} = require('../controllers/userController')
const { authenticateToken, isUser} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/blogs',authenticateToken,isUser,approvedBlog);
router.post('/blog',authenticateToken,isUser,handleBlogCreation);
router.get('/blogs/:id' , authenticateToken,isUser,approvedBlogSelect)
router.post('/blogs/:id/comments', authenticateToken,isUser, handleComments)
router.get('/blogs/:id/comments',authenticateToken,isUser,displayComments)

module.exports = router;
const express = require('express')
const {authenticateToken,isAdmin} = require('../middlewares/authMiddleware') 
const {pendingBlog,approveOrRejectedBlog} = require('../controllers/adminController')

const router = express.Router();

router.get('/blogs', authenticateToken ,isAdmin, pendingBlog)
router.patch('/blogs/:id' , authenticateToken,isAdmin,approveOrRejectedBlog)

module.exports = router;
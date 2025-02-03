const express = require('express')
const {signup,login} = require('../controllers/authController')
const {validationSignup,validationLogin} = require('../validations/authValidation')
const router = express.Router();

router.post('/signup' , validationSignup,signup);
router.post('/login' , validationLogin,login);

module.exports = router;
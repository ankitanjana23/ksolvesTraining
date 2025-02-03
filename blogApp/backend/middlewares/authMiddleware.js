const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    token = token.split(" ")[1];
    try {   
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const isUser = (req,res,next) =>{ 
    //admin not allow to use this page req.user.isadmin true
    if (!req.user) {
        return res.status(403).json({ message: 'Unauthorized User' });
    }
    next();
}

const isAdmin = (req,res,next) =>{
    if(!req.user || !req.user.isadmin){
        return res.status(403).json({message: "Only Admin are allowed"})
    }
    next()
}

module.exports = {authenticateToken,isUser,isAdmin}
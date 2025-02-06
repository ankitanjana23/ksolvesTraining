const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })  //uploading file at uploads


app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get('/' , (req,res)=>{
    return res.render('homePage');
})

app.post('/profile', upload.single('profileImage'), function (req, res){
     console.log(req.body);
     console.log(req.file);
     return res.redirect('/');
})

app.listen(3000,()=>{
    console.log('Server listen on port 3000')
})
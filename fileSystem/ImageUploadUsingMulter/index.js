const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  });


const upload = multer({ storage: storage })

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get('/' , (req,res)=>{
    return res.render('homePage');
})

app.post('/profile', upload.single('profileImage'), function (req, res){
      return res.redirect('/')
})

app.listen(3000,()=>{
    console.log('Server listen on port 3000')
})
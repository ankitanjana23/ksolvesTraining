const express = require('express')
const ejs = require('ejs')
const app = express();
// Set EJS as templating engine
app.set('view engine', 'ejs');

console.log("hellow ")
app.get('/' , (req,res)=>{
    
    let data = {
        name: 'Akashdeep',
        hobbies: ['playing football', 'playing chess', 'cycling']
    }
    res.render('Home' , {data: data})
})
app.listen(3000,()=>console.log('Server listen port 3000'))

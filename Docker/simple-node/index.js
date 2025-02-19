const express = require('express')
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/' , (req,res)=>{
    console.log('hello everyone')
})

app.listen(PORT,()=>{
    console.log(`Server listen on Port : ${PORT}`)
})

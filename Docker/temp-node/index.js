const express = require('express')
const app = express();

const PORT = 3000;

app.get('/' , (req,res)=>{
    console.log('hello everyone')
    res.send('hellow Everyone')
})

app.listen(PORT,()=>{
    console.log(`Server listen on Port : ${PORT}`)
})

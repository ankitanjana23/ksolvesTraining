const express = require("express")
const app = express()

const PORT = 3001;

app.use(express.json())

app.get('/' , (req,res) =>{
    res.send('data')
})

app.listen(PORT , () => {
    console.log(`Server connected Port ${PORT}`)
})
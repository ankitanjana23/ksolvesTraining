const express = require("express")
const app = express()

require('dotenv').config()
//connect postgresql 
const {Pool} = require('pg')
const connection = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });


const PORT = process.env.PORT || 3001;

app.use(express.json())

app.get('/api', async (req, res) => {
    try {
      const result = await connection.query('SELECT * FROM Marks');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/' , (req,res) =>{
    res.status(200).send('Backend Connected Successfully')
})

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
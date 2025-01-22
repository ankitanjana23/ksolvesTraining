const express = require("express")
const app = express()


//connect postgresql 
const {Pool} = require('pg')
const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Ankit@#4565',
    database: 'my_db'
  });


const PORT = 3001;

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
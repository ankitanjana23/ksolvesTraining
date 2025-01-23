const express = require('express')
const app = express();
const PORT = 3000;
const mysql = require('mysql')

const connection = mysql.createConnection({
      host: 'localhost' ,
      user: 'root' ,
      password: 'Ankit@#4565' ,
      database: 'my_db',
})

connection.connect((err) => {
    if(!err) console.log('database connected successfully');
    else console.log('database connection error ',err);
})

app.use(express.json()) 

//connect backend with sql 
//install npm i mysql

app.get('/' , (req,res)=>{
    res.send({'res' : 'backend connect successfully'})
})

//You have two either go with any method 

app.get('/api' ,(req,res)=>{
    connection.query('SELECT * FROM Marks' , (err,result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Database query error', details: err.message });
            return;
          }
          res.json(result);
    })

    //  try{
    //     const result = await connection.query('SELECT * FROM Marks');
    //     res.json(result);

    //  }catch(err){
    //      console.log(err);
    //      res.status(500).json({error: 'Database query error' , details: err.message})
    //  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})
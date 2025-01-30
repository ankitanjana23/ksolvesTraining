const express = require('express');
const {Pool} = require('pg')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Database connection error:', err));


  //check if user already exist 

const checkUserExist = async (req,res,next)=>{
      let {email} = req.body;
      try{
        const result= await db.query('SELECT * FROM users WHERE email = $1' , [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        next();
      }catch(err){
        return res.status(500).send('data not fetch from server')
      }
}

//Signup Route 
app.post('/users/signup' ,checkUserExist, async(req,res)=>{
    const {name,email,password,isadmin} = req.body;
    const value = isadmin||false;
    const hashedPassword = await bcrypt.hash(password, 10); //hased password ?

    // add data in database INSERT querey
    let q = 'INSERT INTO users (name,email,password,isadmin) VALUES($1,$2,$3,$4)'

    try{
       const {rows} = await db.query(q,[name,email,hashedPassword,value]); //destruchuring rows
       return res.status(201).json({message: 'User register successfully' ,user:rows[0]})
    }
    catch(err){
        return res.status(500).send('data not fetch from server');
    }
})

//Login Route 

app.post('/users/login' , async(req,res)=>{

    const {email,password} = req.body;
    //check this data present inside our database our not 

    let q = 'SELECT * FROM users where email = $1';

    try{
       const result = await db.query(q,[email]);
       if(result.rows.length ==0){
        return res.status(400).json({ message: 'User not found' });
       }
       const user = result.rows[0];
       //compare password 
       const validPassword = await bcrypt.compare(password, user.password);
       if(!validPassword){
        return res.status(400).json({ message: 'Invalid credentials' });
       }
       const token = jwt.sign({ id: user.id, isadmin: user.isadmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token });
    }
    catch(err){
        return res.status(500).send('Failed to login');
    }
})


app.get('/users',async (req,res)=>{
    
    let q = 'SELECT * FROM users';
    try{
       //destruchuring rows object from complete object 
       const {rows} = await db.query(q);
       res.json(rows);
    }catch(err){
        console.error(err);
        return res.status(500).send('data not fetch from server')
    }
})

const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    token = token.split(" ")[1];
    try {   
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Admin-only route
app.get('/admin', authenticateToken, (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ message: 'Welcome Admin' });
});

app.use((req,res)=>{
    res.status(404).json({ error: 'Route not found' });
 })

app.listen(PORT , () =>{
    console.log(`server listen on port https://localhost:${PORT}`)
})


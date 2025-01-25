const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

//middleware 1 check user exist or not 
const checkUserExist = (req,res,next)=>{
    let userId = req.params.id;
    let sql = 'SELECT * FROM users Where id = ?';

    db.query(sql,[userId] , (err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send(`data not fetching from Server`)
        }
        if(result.length ===0) return res.status(500).send(`error middleware user not exist for id : ${userId}`)
        req.user = result[0] //store data for further use
        next();
    })
}

app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('failed to fetch data')
        }
        res.json(result);
    })
})

app.get('/users/:id',checkUserExist, (req, res) => {
    res.json(req.user);
})

app.post('/users', (req, res) => {
    let { id, name, email, age } = req.body; //fetch data 
    //if any data missing so set null and user enter nothing so don't enter anything
    //if id already exist so give error failed to fetch data 
    let sql = 'INSERT INTO users(id,name,email,age) VALUES(?,?,?,?)';
    const values = [id, name || null, email || null, age || null];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 'error': 'failed to fetch data' })
        }
        res.status(201).send(`user added with id : ${id}`);
    })
})

app.delete('/users/:id',checkUserExist, (req, res) => {
    
    const sql = 'DELETE FROM users WHERE id = ?'
    const userId = req.params.id;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 'error': 'do not fetch data from server' })
        }
        // if (result.affectedRows === 0) {
        //     return res.status(500).send(`user id ${userId} not exist in database`)
        // }
        return res.status(201).send(`users deleted with id : ${userId}`);
    })
})

app.put('/users/:id',checkUserExist, (req, res) => {
    let userId = req.params.id;
    let { name, email, age } = req.body;  // object spreading 
    // put - full updation Required all field otherwise set null
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Missing required fields: name, email, and age' });
    }

    let sql = 'Update users set name = ? , email = ? ,age = ? where id = ?';

    db.query(sql, [name, email, age, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('data not fetch from server')
        }
        res.status(200).send(`data successfully updated with id ${userId}`)
    })
})

app.patch('/users/:id',checkUserExist, (req, res) => {

    let userId = req.params.id;
    let { name, email, age } = req.body;

    //patch do partial updation 
    if (!name && !email && !age) {
        //if you not provide anything so get error 
        return res.status(400).send('Bad request please provide any one field like name , email,age')
    }

    // db.query('select * from users where id = ?', [userId], (err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('data not fetch from server');
    //     }
    //     if (result.length === 0) {
    //         return res.status(500).send(`data not present for this id ${userId}`)
    //     }
    //     const currentUsers = result[0];
        let currentUsers = req.user;
        let updatedName = name || currentUsers.name;
        let updatedEmail = email || currentUsers.email;
        let updatedAge = age || currentUsers.age;

        let sql = 'update users set name = ? , email = ? ,age = ? where id = ?';
        db.query(sql, [updatedName, updatedEmail, updatedAge, userId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('data not fetch from server')
            }
            return res.status(200).send(`data successfully updated with id : ${userId}`)
        })
    })

db.connect((err) => {
    if (err) throw err;
    console.log('databases connected successfully')
})

app.listen(PORT, () => {
    console.log(`Server is listen on Port: http://localhost:${PORT}`)
})


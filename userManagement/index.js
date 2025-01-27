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

const checkProductExist = (req,res,next) =>{
    let sql = 'select * from products where id = ?'
    let userId = req.params.id;
    
    db.query(sql,[userId] , (err,result)=>{
         if(err){
            console.error(err);
            return res.status(500).send('database not connected with server')
         }
         if(result.length === 0){
            return res.status(400).send(`product not present with id : ${userId}`)
         }
         req.products = result[0]; //store result 
         next()
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

    app.get('/users/products/:id', checkUserExist, async(req,res)=>{
        let userId = req.params.id;
        let sql = 'select u.id as user_id ,u.name as user_name, p.name as product_name , p.price as product_price from users as u Left join products as p on p.user_id = u.id where user_id = ?';
        try{
            await db.query(sql,[userId] ,(err,result)=>{
                res.json(result);
            })
        }catch(err){
            console.error(err);
            return res.status(500).send('data not fetch from server');
        }
    })

    app.get('/products' , (req,res)=>{
        //display all products
        let sql = 'select * from products';
        db.query(sql,(err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).send('servere not connected ...')
            }
            res.json(result);
        })
    })
    
    app.get('/products/:id' ,checkProductExist, (req,res)=>{
            res.json(req.products);
    })
    
    app.post('/products' , (req,res)=>{
           let sql = 'INSERT INTO products (name , description , price , stock,user_id) values(?,?,?,?,?)'
           let {name, description, price, stock,user_id} = req.body;
           let value = [name , description ||null , price , stock,user_id];
           db.query(sql,value , (err,result)=>{
               if(err){
                console.error(err);
                return res.status(500).send('data not fetch from server')
               }
               return res.status(201).send(`product successfully created `)
           })
    })
    
    app.put('/products/:id' , checkProductExist, (req,res)=>{
        /*
        //just see partial updation and full updation 
        let userId = req.params.id ;
        let {name} = req.body; 
        if(!name) return res.status(500).send(`provide name for id ${userId}`)
        
        let sql = 'update products set name = ? where id = ? '
    
        productDb.query(sql,[name , userId] , (err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).send('product not fetch from server')
            }
            return res.status(201).send(`use put request and successfully update product with id ${userId}`)
        })
        */
        //  console.log(req.products); //data
         let userId = req.params.id;
         let {name , description , price , stock} = req.body;
         //all filed required 
         if(!name || !description || !price || !stock ){
            return res.status(400).send(`please provide all required field like name , description , price , stock with id : ${userId}`)
         }
         let sql = 'update products set name = ? , description = ? , price = ? , stock = ? where id = ? ';
         db.query(sql,[name,description,price,stock, userId] ,(err,result)=>{
             if(err){
                console.error(err);
                return res.status(500).send('product not fetch from Server')
             }
             return res.status(201).send(`product updated successfully with id : ${userId}`)
         })
    })
    
    app.patch('/products/:id',checkProductExist,(req,res)=>{
        let userId = req.params.id ;
        let {name ,description,price,stock,user_id} = req.body;
        //any one field required 
        if(!name && !description && !price && !stock && !user_id){
            return res.status(500).send(`please provide any one field like name , description , price , stock with id with ${userId}`)
        }
        let products = req.products ; //fetch data 
        let updatedName = name || products.name ;
        let updatedDescription = description || products.description;
        let updatedPrice = price || products.price;
        let updatedStock = stock || products.stock;
        let updatedUser_id = user_id || products.user_id;
        let sql = 'update products set name = ? , description = ? , price = ? , stock = ? ,user_id = ? where id = ?';
        db.query(sql,[updatedName,updatedDescription, updatedPrice , updatedStock, updatedUser_id,userId], (err,result)=>{
             if(err){
                console.error(err);
                return res.status(500).send('product not fetch form databases')
             }
             return res.status(201).send(`products patched successfully with id : ${userId}`)
        })
    })
    
    app.delete('/products/:id' ,checkProductExist, (req,res)=>{
        let sql = 'delete from products where id = ?'
        let userId = [req.params.id]
        db.query(sql,userId,(err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).send('product not fetch from database')
            }
            return res.status(201).send(`product deleted successfully with id : ${userId}`)
        })
    })

db.connect((err) => {
    if (err) throw err;
    console.log('databases connected successfully')
})

app.listen(PORT, () => {
    console.log(`Server is listen on Port: http://localhost:${PORT}`)
})

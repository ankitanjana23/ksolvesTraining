const {Pool} = require('pg');
require('dotenv').config() ;
// without dotenv config - use command line 

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect()
.then(()=> console.log("Connected to PostgreSQL database"))
.catch((err)=>console.log('Database Connection error:', err))

module.exports = db;
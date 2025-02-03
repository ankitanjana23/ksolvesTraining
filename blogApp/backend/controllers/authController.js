const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req,res) => {
         const {name,email,password } = req.body;
         let isadmin =false;
         const hashedPassword = await bcrypt.hash(password, 10); //hased password ?
     
         // add data in database INSERT querey
        
     
         try{
            const result= await db.query('INSERT INTO users (name,email,password,isadmin) VALUES($1,$2,$3,$4)',
                [name,email,hashedPassword,isadmin] 
            )//destruchuring rows
            // if(result.rows[0].length ===0){
            //     return res.status(400).send('containe empty data')
            // } 
            return res.status(201).json({message: 'User register successfully'})
         }
         catch(err){
             return res.status(500).send('data not fetch from server');
         }
}

const login = async(req,res) => {
     const {email,password} = req.body;
          try{
         //    console.log(hii);
            const result = await db.query('SELECT * FROM users WHERE email = $1',[email]);
            // if(result.rows.length ==0){
            //  return res.status(400).json({ message: 'User not found' });
            // }
            const user = result.rows[0];
            //compare password 
            const validPassword = await bcrypt.compare(password, user.password);
     
             
            if(!validPassword){
             return res.status(400).json({ message: 'Invalid password' });
            }
            
            const token = jwt.sign({ id: user.id, isadmin: user.isadmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
         }
         catch(err){
             return res.status(500).send('Failed to login');
         }
}

module.exports = {signup,login}
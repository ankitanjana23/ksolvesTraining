const db = require('../config/db')

const handleBlogCreation = async (req,res) =>{
     const {title,content} = req.body; //here we stuck in one issue how to get user_id from token
     const user_id = req.user.id ; //with the help of token fetch user_id
     try{
         const result = await db.query('INSERT INTO blog (title , content , user_id) VALUES ($1,$2,$3)' , [title,content,user_id])
         return res.status(201).json({message: "blog created and submitting for approvel"})
     }
     catch(err){
        console.error(err);
        return res.status(500).json({message: "Error Creating Blog"})
     }
}

const approvedBlog = async (req,res) =>{
      try{
         const result = await db.query('SELECT title,content FROM blog WHERE status = $1' , ['approved'])
         return res.status(200).json(result.rows)
      }catch(err){
        console.error(err);
        return res.status(500).json({message: "Error Fetching Approved Blog"})
      }
}

module.exports = {handleBlogCreation,approvedBlog} ;
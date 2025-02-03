const db = require('../config/db')

const pendingBlog = async (req,res) =>{
      
     try{
        const result = await db.query('SELECT * FROM blog WHERE status = $1' , ['pending'])
        console.log(result.rows)
        return res.status(200).json(result.rows);
     }catch(err){
        console.error(err);
        return res.status(500).json({message: "Error Fetching pending Blogs"})
     }
}

const approveOrRejectedBlog = async (req,res) =>{
      const id = req.params.id;
      const {status} = req.body; //either approved or rejected 

      try{
         const result = await db.query('UPDATE blog SET status = $1 WHERE id = $2' , [status,id])
         //if no blogs for this particular id 
         if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
         return res.status(201).json({message : `Blog ${status} successfully by Admin`})
      }
      catch(err){
        console.error(err);
        return res.status(500).json({message: "Error Fetching pending Blogs"})
      }
}

module.exports = {pendingBlog,approveOrRejectedBlog}
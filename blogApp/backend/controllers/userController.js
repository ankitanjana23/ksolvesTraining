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
         const result = await db.query('SELECT id ,title,content FROM blog WHERE status = $1' , ['approved'])
         return res.status(200).json(result.rows)
      }catch(err){
        console.error(err);
        return res.status(500).json({message: "Error Fetching Approved Blog"})
      }
}

const approvedBlogSelect = async (req,res) =>{
     const id = req.params.id;
     try{
       const result = await db.query('SELECT title,content FROM blog WHERE id = $1' , [id])
       if (result.rows.length === 0) {
         return res.status(404).json({ message: "Blog not found or not approved" });
       }
       return res.status(200).json(result.rows)
     }
     catch(err) {
      console.error(err);
      return res.status(500).json({message: "Error Selecting Approved Blog by id"})
     }
}

const handleComments = async (req,res) => {
     const {content, parent_comment_id } = req.body;
     const blog_id = req.params.id;  
     const user_id = req.user.id; 
     const parentComment = parent_comment_id || null; //at start set to null
     try{
        const result = await db.query('INSERT INTO comments (user_id, blog_id, parent_comment_id, content) VALUES($1,$2,$3,$4)' , [user_id,blog_id,parent_comment_id,content])
        return res.status(201).json({message: "Insert new Comment successfully"})
     }
     catch(err){
      console.error(err);
      return res.status(500).json({message: "Error Adding comments"})
     }
}

const displayComments = async (req, res) => {
   const blog_id = req.params.id;
 
   try {
     const result = await db.query('SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at ASC', [blog_id]);
     if (result.rows.length === 0) {
       return res.status(404).json({ message: "No comments found." });
     }
 
     const buildCommentTree = (comments, parentId = null) => {
       return comments
         .filter(comment => comment.parent_comment_id === parentId) // Find comments with the same parent
         .map(comment => ({
           ...comment,
           replies: buildCommentTree(comments, comment.comment_id), // Recursively find replies
         }));
     };
 
     const commentsTree = buildCommentTree(result.rows);
 
     return res.status(200).json(commentsTree); // Send the nested comment tree
   } catch (err) {
     console.error(err);
     return res.status(500).json({ message: "Error Fetching Comments" });
   }
 };
 

module.exports = {handleBlogCreation,approvedBlog ,approvedBlogSelect,handleComments, displayComments} ;
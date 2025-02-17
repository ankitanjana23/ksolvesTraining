
const pageValidation = async(req,res,next)=>{
     let {pageName=1,pageSize=10,sort="desc"} = req.query;
     pageName = Math.max(0,(pageName-1)*pageSize)  //handle pagination logic
     pageSize = Math.max(1,parseInt(pageSize)); //at least single image display 
     req.data = {pageName,pageSize,sort};
     next()
}

module.exports = pageValidation
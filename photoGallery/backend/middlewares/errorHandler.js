const logger = require("../logger")

const errorHandler = (err,req,res,next) =>{
     const errStatus = err.statusCode || 500;
     const errMsg = err.message || "something went wrong";
     logger.error(`${errMsg}`)
     res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
     });
}

module.exports = errorHandler;
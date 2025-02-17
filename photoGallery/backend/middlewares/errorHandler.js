const errorHandler = (err,req,res,next) =>{
    //  const errStatus = err.statusCode || 500;
    //  const errMsg = err.message || "something went wrong";
    //  res.status(errStatus).json({
    //     success: false,
    //     status: errStatus,
    //     message: errMsg,
    //  });
    console.error(`[Error] ${err.message}`);

  // Set default error status
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
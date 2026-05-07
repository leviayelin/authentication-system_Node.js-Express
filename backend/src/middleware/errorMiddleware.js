// Error handling section 
export const errorHandler = (err,req,res,next)=>{
    // console.error(err);
    const statusCode = err.status || 500;
    const messages = err.message || "Internal Server Error";
    // developer logs 
    console.log(`[ERROR] ${statusCode} - ${messages}`);
    // client logs
    res.status(statusCode).json({
        status:'error',
        message:messages
    });
};

// ***note - centerilze the error handling functions
// ** after creation, attach to app for use
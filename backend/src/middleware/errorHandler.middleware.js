export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //If response status is 200 then set it to 500 else use existing status code
    res.status(statusCode).json({
     message: err.message,
     stack: process.env.NODE_ENV === 'production' ? null : err.stack // Don't send stack trace in production
    });
   };
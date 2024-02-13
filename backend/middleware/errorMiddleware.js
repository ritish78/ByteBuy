const resourceNotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'Cast Error!' : error.stack
    })
}

module.exports = {
    resourceNotFound,
    errorHandler
}
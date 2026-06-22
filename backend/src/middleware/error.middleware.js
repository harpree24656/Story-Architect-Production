// import .env
import env from '../config/env.js'

// handle middleware error
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        stack: env.NODE_ENV === 'development' ? err.stack : undefined
    })
}
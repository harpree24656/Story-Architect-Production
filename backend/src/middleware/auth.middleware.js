// import the clerk auth 
import { verifyToken } from '@clerk/express'
import { env } from '../config/env.js'

// create middlware of auth
export const authMiddleware = async (req, res, next) => {
    try{ 
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) { 
            res.status(401).json({
                success: false,
                error: "Unauthorized"
            })
        }
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token, {
            secretKey: env.CLERK_SECRET_KEY 
        })
        req.user = decoded;
        next()
    }
    catch(error){
        error.statusCode = 400,
        error.message = 'Unauthorized, Invalid token',
        next(error)
    }
} 
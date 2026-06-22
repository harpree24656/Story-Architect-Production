// importing some package to build app
import express, { text } from 'express'
import cors from 'cors'
import { routeIndex } from './routes/index.js'
import { errorMiddleware } from './middleware/error.middleware.js'
import { rateLimitMiddleware } from './middleware/rateLimit.middleware.js'

// create app for req, res
const app = express()

// connection between frontend and backend
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

// convert data in json format
app.use(express.json())

// parse from data
app.use(express.urlencoded({extended: true}));

// create route
app.get( '/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working"
    })
})

// mount all api
app.use('/api', routeIndex);

// request for error handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route Not Found"
    })
})

// ADD Global error
app.use(errorMiddleware);

// add rate-limit-middleware
app.use('/api' ,rateLimitMiddleware);

// export app
export default app;
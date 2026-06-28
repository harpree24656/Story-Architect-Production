// import db, app and env
import app from './app.js'
import { connectDB } from './config/db.js'
import env  from './config/env.js'

// async func to database connection
const startServer = async() => {
    try{
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
            console.log(`Mode: ${env.NODE_ENV}`)
        })
    }
    catch(error){
        console.error('Failed to start ', error);
        process.exit(1);
    }
}
startServer()

// process error hadling
process.on( 'unhandledRejection', (error) => {
    console.error('Unhandled Rejection ', error)
    process.exit(1)
})
process.on( 'uncaughtException', (error) => {
    console.error('Uncaught Exception ', error)
    process.exit(1)
})
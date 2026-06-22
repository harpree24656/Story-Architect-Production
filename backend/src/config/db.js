// import mongoose for url
import mongoose from 'mongoose'
// import from env.js
import {env} from './env.js'
// create async function to connect mongoDB
export const connectDB = async () => {
    try{
        // attempt mongoDB connection url
        const connection = await mongoose.connect(env.MONDGO_URL)
        console.log(`MongoDB connected: ${connection.connection.host}`)
    }
    catch(error){
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}
// include dotenv for env
import dotenv from 'dotenv'
dotenv.config()

// create variable to access .env and show error if not found
const requireEnvVariable = [
    'PORT',
    'MONGO_URL',
    'CLERK_SECRET_KEY'
];
// prevention for app
for(const variable of requireEnvVariable){
    if(!process.env[variable]){
        throw new error(`Missing required environment variables: ${variable}`)
    }
}

export const env = {
    // export port, clerk_key, mongo_url
    PORT = process.env.PORT,
    MONDGO_URL = process.env.MONDGO_URL,
    CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY,
    OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || null,

    // for node production 
    NODE_ENV = process.env.NODE_ENV || 'development'

}
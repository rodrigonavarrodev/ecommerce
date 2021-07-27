import { config as dotenv } from 'dotenv'
dotenv();

export default {
    secret: process.env.JWT_SECRET_KEY,
    tokenExpires: process.env.TOKEN_KEEP_ALIVE
}
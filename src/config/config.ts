import { config as dotenv } from 'dotenv'
dotenv();

export default {
    //importamos el ENV y las exportamos para usar
    secret: process.env.JWT_SECRET_KEY,
    tokenExpires: process.env.TOKEN_KEEP_ALIVE
}
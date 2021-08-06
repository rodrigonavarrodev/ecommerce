import { config as dotenv } from 'dotenv'
dotenv();

export default {
    //importamos el ENV y las exportamos para usar
    secret: process.env.JWT_SECRET_KEY,
    tokenExpires: process.env.TOKEN_KEEP_ALIVE,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PW,
    mongoHost: process.env.MONGO_HOST,
    mongoDatabase: process.env.MONGO_DB,
    nodemailerPass: process.env.NODEMAILER_PW,
    cloundinaryUrl: process.env.CLOUDINARY_URL
}
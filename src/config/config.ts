import { config as dotenv } from 'dotenv'
dotenv();

export default {
    secret: process.env.SECRET!
}
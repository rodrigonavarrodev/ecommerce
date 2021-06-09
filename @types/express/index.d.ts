import { jwtModel } from '../../src/common/types/jwt'
import multer from 'multer'
let multerFile: Express.Multer.File;

declare global{
    namespace Express {
        interface Request {
            jwt: jwtModel;
            files: any;
        }
    }
}
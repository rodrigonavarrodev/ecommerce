import express from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const errors = validationResult(req);
        //console.log(errors);
        
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array({ onlyFirstError: true }) });
        }
        next();
    }
}

export default new BodyValidationMiddleware();

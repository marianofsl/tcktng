import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';

 export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
     console.log(err);
    if (err instanceof BaseError) {
        return res.status(err.statusCode).send(
            err.serializeError()
        );
    }

    return res.status(400).send({
        errors: [
            {
                message: 'Uh oh :('
            }
        ]
    });
};
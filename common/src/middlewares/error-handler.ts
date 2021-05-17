import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/base-error';

 export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).send(
            err.serializeError()
        );
    }

    console.error(err);

    return res.status(400).send({
        errors: [
            {
                message: 'Uh oh :('
            }
        ]
    });
};
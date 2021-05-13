import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { UnauthorizedError } from '../errors/unauthorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new UnauthorizedError();
    }

    next();
};
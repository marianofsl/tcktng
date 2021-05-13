import { ValidationError } from 'express-validator';
import { BaseError } from './base-error';

export class RequestValidationError extends BaseError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super('Request invalid');
        // because we are extending
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError(): Array<{ message: string, field?: string }> {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            };
        })
    }
}
import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
    statusCode = 404;

    constructor() {
        super('Not found');
        // because we are extending
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(): Array<{ message: string, field?: string }> {
        return [
            {
                message: 'Not found'
            }
        ];
    }
}
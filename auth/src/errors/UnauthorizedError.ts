import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    statusCode = 401;

    constructor() {
        super('Not authorize');
        // because we are extending
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeError(): Array<{ message: string, field?: string }> {
        return [
            {
                message: this.message
            }
        ];
    }
}
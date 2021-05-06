import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        // because we are extending
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(): Array<{ message: string, field?: string }> {
        return [
            {
                message: this.message
            }
        ];
    }
}
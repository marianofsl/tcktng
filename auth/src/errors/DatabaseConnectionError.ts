import { BaseError } from "./BaseError";

export class DatabaseConnectionError extends BaseError {
    statusCode = 500;
    reason = 'Error connection to database';

    constructor() {
        super('Database connection error');
        // because we are extending
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError(): Array<{ message: string, field?: string }> {
        return [
            {
                message: this.reason
            }
        ];
    }
}
export abstract class BaseError extends Error {
    constructor(message: string) {
        super(message);
        // because we are extending
        Object.setPrototypeOf(this, BaseError.prototype);
    }
    
    abstract serializeError(): Array<{message: string, field?: string}>;
    abstract readonly statusCode: number;
}
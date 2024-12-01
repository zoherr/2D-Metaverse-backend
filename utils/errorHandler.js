class ErrorHandler extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;

class ApiError extends Error {
    constructor(statusCode,message = "Something Wrong"){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export {ApiError}
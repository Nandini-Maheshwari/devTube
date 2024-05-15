//api request handling 
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = "" //error stack
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null // read abt it
        this.success = false
        this.errors = this.errors

        if (stack) {
            this.stack = stack 
        } else {
            Error.captureStackTrace(thos, this.constructor)
        } // can avoid
    }
}

export { ApiError }

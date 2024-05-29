//class designed to be used in an API to handle and provide detailed error info
class ApiError extends Error { //built in Error class in JS
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = "" //error stack
    ){
        super(message) //super keyword is used to call the constructor of the parent class
        this.statusCode = statusCode
        this.data = null // read abt it
        this.success = false
        this.errors = this.errors

        if (stack) {
            this.stack = stack 
        } else {
            Error.captureStackTrace(this, this.constructor)
        } // can avoid
    }
}

export { ApiError }
    
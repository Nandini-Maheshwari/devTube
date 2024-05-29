const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}
export { asyncHandler }

//higher order function - that take function as parameter and returns another function
//a utility function used to wrap asynchronous Express route handlers.
/*
fn <- a route handler
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/ 

//USE
//Instead of manually writing try-catch blocks in every asynchronous route handler 
//to catch errors and pass them to the error-handling middleware, you can wrap your
//handlers with asyncHandler.
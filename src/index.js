//require('dotenv').config({path: './env}); <- inconsistent code both require and import in same file
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path: '.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection error: ", err);
})

/*
Approach-1

import express from 'express'
const app = express()
//iffe -> immediately invoked function expression
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log("App listening on port ${process.env.PORT}")
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
}) ()
*/
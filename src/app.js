import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//When you call app.use(), you're telling Express to use the specified 
//middleware function for all HTTP requests, here cors()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users', userRouter)
//http://localhost:8000/api/v1/users/register

export { app } 
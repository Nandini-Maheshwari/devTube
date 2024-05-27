import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //searching field true    
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true   
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true   
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: { //challenge
            type: String,
            required: [true, "Password required"]
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

//pre <- hook\
//This pre-save hook is executed before a user document
//is saved to the database.
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
}) 

//This method is used to compare a plain text password 
//with the hashed password stored in the database.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

//This method is used to create an access token for a user. 
//This access token can then be used for authentication purposes
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//This method is used to create a refresh token for a user. 
//Refresh tokens are used to obtain new access tokens without requiring the user to re-authenticate.
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
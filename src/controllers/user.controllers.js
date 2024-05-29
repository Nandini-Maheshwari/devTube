import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { upload } from '../middlewares/multer.middleware.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    //--->get user details from frontend
    const { fullName, email, username, password } = req.body
    console.log("email: ", email);

    //validation - !empty
    // if (fullName === "") {
    //     throw new ApiError(400, "fullName required")
    // }

    if 
    ( 
        [fullName, email, username, password]
        .some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields required");
    }

    //--->check if user already exists - username, email
    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with entered email or username already exists")
    }

    //--->check for images & avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file required");
    }

    //--->upload images & avatar to cloudinary and check
    const avatar = await uploadOnCloudinary(avatarLocalPath); 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file required");
    }

    //--->create user object - create entry in DB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    //--->check if user is created
    //--->remove password & refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating new user")
    }

    //--->return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {
    registerUser,
}   
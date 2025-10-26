import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";


// generator Access And Refreshtoken
  const generatorAccessAndRefreshtoken = async (user) =>{
    try {
        const accessToken = await user.generatorAccessToken();
        const refreshToken = await user.generatorRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken , refreshToken};

    } catch (error) {
        console.log("generator Access And Refreshtoken error" , error.message);
        
    }
}

const signup = async (req , res)=> {
    try {
         const { fullName, email, password , bio } = req.body;

        // Validate required fields
        if (![fullName, email, password , bio].every((field) => field && field.trim())) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { fullName }]
        });
        if(existingUser){
            return res.status(400).json(new ApiError(400, "User already exists"));
        }
         // Check password length
        if (password.length < 8) {
            return res.status(400).json(new ApiError(400, "Password must be at least 8 characters long"));
        }
         // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const users = await User.create({ fullName, email, bio, password: hashedPassword });
         // Exclude password from response
        const createUser = await User.findById(users._id).select("-password");
        if (!createUser) {
            return res.status(400).json(new ApiError(400, "Invalid user"));
        }

        return res.status(201).json(new ApiResponse(201, "User created successfully", createUser));
    } catch (error) {
        console.error("User creation error:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error"));
    }
}

const login = async (req,res) => {
    try {
         const {email, password} = req.body;
         // Validate required fields
         if(![email , password].some((field)=> field && field.trim())){
            return res.status(400).json(new ApiError(400, "All fields are required"));
         }

        //user found

        const userFound = await User.findOne({
            $or : [{email}]
        });

        if (!userFound){
            return res.json(new ApiError(400 , "invalied user"));
        }
        const isPasswordCorrect = await userFound.isPasswordCorrect(password);

        if(!isPasswordCorrect){
            res.json(new ApiError(400 , "invalid password or email"));
        }

        const {accessToken , refreshToken} = await generatorAccessAndRefreshtoken(userFound);
       const loginUser = await User.findById(userFound._id).select("-password");

       let options = {
           secure : true,
           httpOnly : true
       };

       res.cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json(new ApiResponse (200 , "user login successfully" , {loginUser , accessToken}));
    } catch (error) {
        console.error("User login error:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error"))
    }
}


//all controllers export heare

export {
    signup,
    login
}
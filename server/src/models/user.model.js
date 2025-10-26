import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken"

const userSchema = new mongoose.Schema( {

    fullName : {
        type : String,
        required : [true , "username is required"],
        trim : true
    },
    email : {
        type : String,
        required : [true , "email is required"],
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : [true , "password is required"],
        minlength : [8 , "minimum length is 8"],
    },
    emailverified : {
        type :String,
        date : new Date()
    },
    publicId : {
        type : String
    },
    profilePic : {
        type : String
    },
    role : {
        type : String,
        enum : ["user" , "admin" ,"editor"],
        lowercase : true
    },
    resetpasswordToken : {
        type : String,
    },
    address : [
        {strret : String} , {country :String },{postalcode : String} , {district : String}
    ],
    refreshToken : {
        type : String,
    },
    bio : {
        type : String,
    }
    
},{
   timestamps : true
})

            //the compare password and hash password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare( password , this.password);
};
         
                  //generator access token
userSchema.methods.generatorAccessToken = async function(){
   const accesstoken = jwt.sign({_id : this._id , email : this.email , fullName : this.fullName}, process.env.GENERATE_ACCESSTOKEN_SECRET, 
    {expiresIn: process.env.ACCESSTOKEN_EXPIRY });
    return accesstoken
}

                    //generator refresh token
userSchema.methods.generatorRefreshToken = async function () {
    const refreshtoken = jwt.sign({_id : this._id , email : this.email,fullName : this.fullName},process.env.GENERATE_REFRESHTOKEN_SECRET,{
        expiresIn :process.env.REFRESHTOKEN_EXPIRY
    });
    return refreshtoken;
};


export const User = mongoose.model.User ?? mongoose.model("User" , userSchema)
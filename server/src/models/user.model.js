import mongoose from 'mongoose'

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

export const User = mongoose.model.User ?? mongoose.model("User" , userSchema)
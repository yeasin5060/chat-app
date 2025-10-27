import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
    //
export const auth = async (req , res , next) => {
    try {
        const token = req.headers.token
        if(!token){
           return res.json(new ApiError(401 , "unauthorized access"));
        };
        const decoded = jwt.verify(token , process.env.GENERATE_ACCESSTOKEN_SECRET);
        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.json({success : false , message : 'User not found'});
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message});
    }
}
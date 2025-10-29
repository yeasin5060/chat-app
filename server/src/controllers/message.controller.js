
// get all users export the logged in user

import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { cloudinaryFileUpload } from "../utils/cloudinary.js";

const getUsersForSidebar = async (req ,res) => {
    try {
        const userId = req.user._id;
        const filterUser = await User.find({_id :{$ne : userId}}).select('-password');
        // count number of message not seen
        const unSeenMessages = {};
        const promises = filterUser.map(async (user)=>{
            const message = await Message.find({senderId : user._id , receiverId : userId , seen : false});
            if(message.length > 0){
                unSeenMessages[user._id] = message.length;
            }
        });
        await Promise.all(promises);
        res.json({success : true , users : filterUser , unSeenMessages});
    } catch (error){ 
        console.log('getUserForSidebar error :', error.message);
        
        res.json({success : false, message : error.message})
    }
}

//get all message for selected user

const getMessage = async (req ,res) => {
    try {
        const {id : selectedUserId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or : [
                {senderId : myId , receiverId : selectedUserId},
                {senderId : selectedUserId , receiverId : myId}
            ]
        });
        await Message.updateMany({senderId : selectedUserId , receiverId : myId} , {seen : true});
        res.json({success : false, messages})
    } catch (error) {
        console.log('getMessage error :', error.message);
        res.json({success : false, message : error.message})
    }
}

//api to mark message as seen using message id
const markMessageAsSeen = async (req , res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id , {seen : true});
        res.json({success : true});
    } catch (error) {
        console.log('markmessageasseen error :' , error.message);
        res.json({success : false, messages : error.message});
    }
}

//send message to selected user
const sendMessage = async (req ,res) =>{
    try {
        const {text , image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinaryFileUpload(image , 'sendImg');
            imageUrl = uploadResponse.secure_url;
        }
    } catch (error) {
        console.log('sendMessage error :' , error.message);
        res.json({success : false, messages : error.message});
    }
}

// all controller export heare 

export {
    getUsersForSidebar,
    getMessage,
    markMessageAsSeen,
    sendMessage
}
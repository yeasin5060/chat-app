
// get all users export the logged in user

import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

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
        
    } catch (error) {
        
    }
}

// all controller export heare 

export {
    getUsersForSidebar
}
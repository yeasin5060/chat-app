import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";



export const ChatContext = createContext();

export const ChatProvider = ({children})=> {
    const [message , setMessage] = useState([]);
    const [uaers , setUsers] = useState([]);
    const [selectedUser , setSelectedUser] = useState(null);
    const [unseenMessage , setUnseenMessage] = useState({});

    const {socket ,  axios  } = useContext(AuthContext);

    // function to get aii user for sidebar
    const getUser = async ()=> {
        try {
            const {data} = await axios.get('/api/v1/message/users');
            if(data.success){
                setUsers(data.users);
                setUnseenMessage(data.unseenMessage);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get message to selected user
    const getMessage = async (userId)=> {
        try {
            const {data} = await axios.get(`/api/v1/message/${userId}`);
             if(data.success){
                setMessage(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

     //function to send message to selected user
     const sendMessage = async (messageData)=> {
        try {
            const {data} = await axios.post(`/api/v1/message/${selectedUser._id}` , messageData);
            if(data.success){
                setMessage((prevMessage) => [...prevMessage , data.message]);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
     }

        //function to subscribe to message for selected user
    const subscribeToMessage = async () => {
        try {
        if(!socket) return ;

        socket.on('newMessage' , (newmessage)=>{
            if(selectedUser && newmessage.senderId === selectedUser._id){
                newmessage.seen = true;
                setMessage((prevMessage)=> [...prevMessage , newmessage]);
                axios.put(`/api/v1/message/mark/${newmessage._id}`)
            }else{
                setUnseenMessage((prevUnseenMessage)=>({
                    ...prevUnseenMessage , [newmessage.senderId] :  prevUnseenMessage[newmessage.senderId] ? prevUnseenMessage[newmessage.senderId] + 1 : 1
                }))
            }
        })
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to unsubscribe from message
    const unsubscribeFromMessage = ()=> {
        if(socket) socket.off('newMessage')
    }

    useEffect(()=> {
        subscribeToMessage();
        return ()=> unsubscribeFromMessage();
    },[socket , selectedUser])
    const value = {
        message , setMessage , uaers , selectedUser , setSelectedUser , getMessage , sendMessage , unseenMessage , setUnseenMessage
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
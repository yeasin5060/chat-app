import React, { useContext, useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formetMeesagetime } from '../lib/utils'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const{selectedUser , sendMessage, setSelectedUser, message  ,getMessage } = useContext(ChatContext);
  const{ authUser,onlineUsers}  = useContext(AuthContext);
  const [input , setInput] = useState('');
  const scrollEnd = useRef()

  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior :'smooth'})
    }
  },[message])

  //handle send message
  const handleSendMessage = async(e)=> {
    e.preventDefault()
    if(input.trim()=== '') return null;
    await sendMessage({text : input.trim()});
    setInput('')
  }

  //handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if(!file || file.type.startsWith('image/')){
      toast.error('select an image file');
      return ;
    }
    const reader = new FileReader()
    reader.onloadend = async (e)=> {
      await sendMessage({image : reader.result});
      e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  useEffect(()=> {
    if(selectedUser){
      getMessage(selectedUser._id)
    }
  },[selectedUser])
  return selectedUser ?(
    <div className='w-full overflow-scroll relative backdrop-blur-lg'>
      {/*------- header ----- */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img className='w-8 rounded-full' src={assets.profile_martin} alt="profile martin" />
        <p className='flex-1 text-lg text-white flex items-center gap-2 capitalize'>
          martin jonson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={()=> selectedUser(null)} className='md:hidden max-w-7' src={assets.arrow_icon} alt="arrow icon" />
        <img className='md:hidden max-w-5' src={assets.help_icon} alt="arrow icon" />
      </div>
      {/*--------- chat area ---------*/}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {
          message.map((msg , index)=> (
            <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
              {
                msg.image ? 
                (
                  <img className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' src={msg.image} alt="" />
                ):(
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg md:8 break-all bg-violet-500/30 text-white ${msg.senderId ===  authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                )
              }
              <div className='text-center text-xs'>
                <img className='w-7 rounded-full' src={msg.senderId ===  authUser._id?authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon } alt="" />
                <p className='text-gray-500'>{formetMeesagetime(msg.createdAt)}</p>
              </div>
            </div>
          ))
        }
        <div ref={scrollEnd}></div>
      </div>
      {/*---------- buttom area ----------*/}
      <div className=' absolute left-0 bottom-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
            <input onChange={(e)=> setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key ==='Enter'? handleSendMessage(e) : null} className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholeder-gray-400' type="text" placeholder='send a message' />
            <input type="file" id ='image' accept='image/jpeg , image/png' hidden />
            <label htmlFor='image'>
              <img className='w-5 mr-2 cursor-pointer' src={assets.gallery_icon} alt="" />
            </label>
        </div>
        <img onClick={handleSendMessage} className='w-7 cursor-pointer' src={assets.send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img className='max-w-16' src={assets.logo_icon} alt="" />
      <p className='text-lg font-medium text-white'>chat anytime , anywhere</p>
    </div>
  )
}

export default ChatContainer
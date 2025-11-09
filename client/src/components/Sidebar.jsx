import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Sidebar = ({selectedUser , setSelectedUser}) => {
    const navigate = useNavigate()
    const {logout} = useContext(AuthContext)
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser? 'max-md:hidden' : ''}`}>
        <div className='pb-5'>
            <div className='flex justify-between items-center'>
                <img className='max-w-40' src={assets.logo} alt="logo" />
                <div className='relative py-2 group'>
                    <img className='max-h-5 cursor-pointer' src={assets.menu_icon} alt="menu" />
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                        <p className='text-sm cursor-pointer capitalize' onClick={()=> navigate('/profile')}>edit profile</p>
                        <hr className='my-2 border border-gray-500'/>
                        <p onClick={()=> logout()} className='text-sm cursor-pointer capitalize'>logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#282132] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
                <img className='w-3' src={assets.search_icon} alt="search icon" />
                <input className='bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1' type="text" placeholder='Search User...' />
            </div>
            <div className='flex flex-col'>
                {
                    userDummyData.map((user, index)=> (
                        <div onClick={()=> setSelectedUser(user)} key={index} className={`relative flex items-center p-2 pl-4 gap-2 mt-4 rounded cursor-pointer max-sm:text-sm ${selectedUser ?._d === user._id &&'bg-[#282142]/50}'}`}>
                            <img className='w-[35px] aspect-[1/1] rounded-full' src={user?.profilePic || assets.avatar_icon} alt="user profile" />
                            <div className='flex flex-col leading-5'>
                                <p>{user.fullName}</p>
                                {
                                    index < 3 
                                    ?
                                    <span className='text-green-400 text-xs capitalize'>online</span>
                                    :
                                    <span className='text-neutral-400 text-xs capitalize'>ofline</span>
                                }
                            </div>
                            {
                                index > 2 && 
                                <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50 '>{index}</p>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar
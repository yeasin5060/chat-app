import React, { useState } from 'react'
import{useNavigate} from 'react-router-dom'
import assets from '../assets/assets';

const ProfilePage = () => {
  const [selectedImg , setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name , setName] = useState('martin jon');
  const [bio , setBio] = useState('Hi Everyone , I am Useing Quickchat')
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    navigate('/')
  }
  
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1' action="">
          <h3 className='texi-lg capitalize'>profile details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input onClick={(e)=> setSelectedImg(e.target.files[0]) } type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" />
            upload profile image
          </label>
          <input className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' type="text" placeholder='Your Name' onChange={(e)=> setName(e.target.value)} value={name} />
          <textarea  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} onChange={(e)=> setBio(e.target.value)} value={bio}></textarea>
          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>save</button>
        </form>
        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfilePage
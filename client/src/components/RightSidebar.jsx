import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? 'max-md:hidden' : ''}`}>
        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img className='w-20 aspect-[1/1] rounded-full' src={selectedUser ?.profilePic || assets.avatar_icon} alt="" />
            <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
              <p className='w-2 h-2 rounded-full bg-green-500'></p>
              {selectedUser.fullName}
            </h1>
            <p className='px-10 mx-auto'>{selectedUser.bio}</p>
        </div>
        <hr className='border-[#ffffff50] my-4'/>
        <div className='px-5 text-xs'>
          <p>media</p>
          <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {
              imagesDummyData.map((url , index)=>(
                <div className='cursor-pointer rounded' key={index} onClick={()=> window.open(url)}>
                  <img className='h-full rounded-md' src={url} alt="" />
                </div>
              ))
            }
          </div>
        </div>
        <div className='bottom-5 absolute left-1/2 transfrom -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white broder-none text-sm font-light py-2 px-20 rounded-full cursor-pointer capitalize'>
            logout
        </div>
    </div>
  )
}

export default RightSidebar
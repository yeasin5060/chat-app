import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currState , setCurrState] = useState('Sign up');
  const [fullName , setFullName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPasword] = useState('');
  const [bio , setBio] = useState('');
  const [isDateSubmitted , setIsDateSubmitted] = useState(false);

  const onSubmitHandler = (event)=> {
    event.preventDefault();
    if(currState === 'Sign up' && !isDateSubmitted){
      setIsDateSubmitted(true);
      return
    }
  }
  return (
    <div className='min-h-screen bg-center bg-cover flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/*------------ left ---------*/}
      <img className='w-[min(30vw , 250px)]' src={assets.logo_big} alt="" />
      {/*------------ right ---------*/}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
        <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
          {isDateSubmitted && <img onClick={()=> setIsDateSubmitted(false)} className='w-5 cursor-pointer' src={assets.arrow_icon} alt="" /> }
        </h2>
        {currState === 'Sign up' && !isDateSubmitted && (
          <input  onChange={(e)=> setFullName(e.target.value)} value={fullName}  className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' type="text" required />
        )}
        {
          !isDateSubmitted && (
            <>
              <input onChange={(e)=> setEmail(e.target.value)} value={email} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email Address' type="email" required />
              <input onChange={(e)=> setPasword(e.target.value)} value={password} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' type="password" required />
            </>
          )
        }
        {currState === 'Sign up' && isDateSubmitted && (
          <textarea onChange={(e)=> setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio....'required ></textarea>
        )}
        <button type='submit' className=' py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === 'Sign up' ? 'Create Account' : 'Login Now'}
        </button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox'/>
          <p>Agrre to the terms of use privacy policy </p>
        </div>
        <div className='flex flex-col gap-2'>
          {
            currState === 'Sign up' ? (
              <p className='text-sm text-gray-600'>All ready have an Account ? <span onClick={()=> {setCurrState('login'),setIsDateSubmitted(false)}}className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
            ) : (
             <p className='text-sm text-gray-600'>Create an Account <span onClick={()=> setCurrState('Sign up')} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default LoginPage
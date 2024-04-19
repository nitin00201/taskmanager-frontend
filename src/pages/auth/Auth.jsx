import React, { useState } from 'react'
import './Auth.css'
import Signin from './Signin'
import Signup from './Signup'

const Auth = () => {
    const[isRegister,setIsRegister]=useState(false)
    const togglePannel=()=>{
        setIsRegister(!isRegister)
    }
  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>

    <div className='box lg:max-w-4xl'>
    <div className={`cover ${isRegister ? "rotate-active":""}`}>
<div className='front'>
    <img src='https://images.pexels.com/photos/18208096/pexels-photo-18208096/free-photo-of-lights-over-street-lamp.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
<div className='text'>
<span className='text-1'>Success is built upon well organised tasks</span>
<span className='text-2 text-xs'>Lets get Connected</span>

</div>
</div>
<div className='back'>
<img src='https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>


</div>

    </div>
    <div className='forms h-full'>

        <div className='form-content h-full'>
            <div className='login-form'>
<Signin togglePannel={togglePannel}/>
            </div>
            <div className='signup-form'>
                <Signup togglePannel={togglePannel}/>
            </div>
        </div>
    </div>

     
    </div>

    </div>
  )
}

export default Auth
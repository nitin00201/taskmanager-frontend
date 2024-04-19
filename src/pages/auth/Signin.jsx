import React, { useState } from 'react'
import { Box, Grid, Modal, TextField, Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../redux/AuthSlice';



const Signin = ({togglePannel}) => {
  const dispatch = useDispatch();
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target
        setFormData({...formData,
            [name]:value
     } )
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(formData))
        console.log("sign in successfully")
        console.log(formData);
    }
  return (
    <div>
    <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
<form className='space-y-3' onSubmit={handleSubmit}>
<TextField fullWidth label="Email" name='email' type='email' value={formData.email} onChange={handleChange} placeholder='enter email'/>
<TextField fullWidth label="Password" name='password' type='password' value={formData.password} onChange={handleChange} placeholder='enter password'/>
<div >
                  <Button
                    fullWidth
                    className="customButton"
                    sx={{ padding: '.9rem' }}
                    type='submit'
                  >
                    Login
                  </Button>
                </div>
</form>    
<div className='mt-5 flex items-center gap-2 py-5 justify-center'>
    <span>Don't have an acount?</span>
    <Button onClick={togglePannel}>sign up</Button>
</div>
    </div>
  )
}

export default Signin
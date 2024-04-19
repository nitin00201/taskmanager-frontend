import { ThemeProvider } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import DarkTheme from './theme/DarkTheme'
import Navbar from './pages/navbar/Navbar'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import {useDispatch , useSelector} from 'react-redux'
import { fetchTasks } from './redux/TaskSlice';
import { getUserProfile } from './redux/AuthSlice';


const App = () => {
  const user =true;
  const dispatch = useDispatch();
  const {task,auth}= useSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(localStorage.getItem("jwt") || auth.jwt))
  },[auth.jwt])
  console.log("user data in app.js",auth);


  return (
    <ThemeProvider theme={DarkTheme}>
    <div>

   {auth.user ? 
   <div><Navbar/>
    <Home/></div>:<Auth/>}

    </div>
    </ThemeProvider>
  )
}

export default App
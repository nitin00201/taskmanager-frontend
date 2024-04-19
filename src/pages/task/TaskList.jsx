import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom'
import TaskCard from './TaskCard';
import {useDispatch , useSelector} from 'react-redux'
import { fetchTasks, fetchUsersTasks } from '../../redux/TaskSlice'


const TaskList = () => {

const dispatch = useDispatch()
const {task,auth} = useSelector(store=>store);


console.log("tasks",task);

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const filterValue=queryParams.get("filter")
  useEffect(()=>{
    if(auth.user?.role === "ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}))
    }
    else{
      dispatch(fetchUsersTasks({status:filterValue}))
    }
    },[filterValue])


  
  return (
    <div className='w-[67vw]'>
        <div className='space-y-3'>
        {
          auth.user?.role==="ROLE_ADMIN"? task.tasks.map((item,index)=>(<TaskCard item={item} key={index}/>)):
          task.usersTask.map((item)=>(<TaskCard item={item}/>))
        }

        </div>
    </div>
  )
}

export default TaskList
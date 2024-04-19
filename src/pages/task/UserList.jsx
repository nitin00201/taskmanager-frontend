import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch , useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Modal from '@mui/material/Modal';
import {ListItem, ListItemAvatar,Avatar ,ListItemText,Divider} from '@mui/material'
import { getUserList } from '../../redux/AuthSlice';
import { assignedTaskToUser } from '../../redux/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};
const tasks=[1,1,1,1]

export default function UserList({handleClose,open}) {
  const {auth}=useSelector(store=>store)
const dispatch=useDispatch()
const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId")
useEffect((item)=>{
  dispatch(getUserList(localStorage.getItem("jwt")))
},[])

const handleAssignTask=(user)=>{
  console.log("userid in userlist",user.id.toString());
  console.log("task id in userlist",taskId);
  dispatch(assignedTaskToUser({userId:user.id.toString(),taskId:taskId}))
}

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            auth.users.map((item,index)=><div className='flex items-center justify-between w-full' key={index}>
              <>
              <div>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>C</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                  secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`}
                  primary={item.fullName}/>
                  
                </ListItem>
              </div>
              <div>
                <Button onClick={()=>handleAssignTask(item)} className='customButton'>select</Button>

              </div>

              </>
            </div>)
          }
          
        </Box>
      </Modal>
    </div>
  );
}
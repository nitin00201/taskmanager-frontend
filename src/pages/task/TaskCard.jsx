import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "./UserList";
import SubmissionList from "./SubmissionList";
import EditTaskForm from "./EditTaskList";
import {useDispatch , useSelector} from 'react-redux'
import { deleteTask } from "../../redux/TaskSlice";
import {useLocation,useNavigate} from 'react-router-dom'
import SubmitForm from "./SubmitFormModel";


const TaskCard = ({item}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {task,auth}= useSelector(store=>store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const[openUserList,setOpenUserList]=useState(false)
  const[openSubmissioList,setOpenSubmissionList]=useState(false)
  const handleOpenUserList=()=>{
    const updatedParams = new URLSearchParams(location.search)
    updatedParams.set("taskId",item.id)
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    setOpenUserList(true)
    handleMenuClose()
    console.log("handleopen user list");
  }
  const handleCloseUserList=()=>{
    setOpenUserList(false)
    console.log("handleopen user list");
  }

  const handleOpenSubmissionList=()=>{
    const updatedParams = new URLSearchParams(location.search)
    updatedParams.set("taskId",item.id)
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    setOpenSubmissionList(true)
    handleMenuClose()
    console.log("handleOpenSubmissionList");
  } 
  const handleCloseSubmissionList=()=>{
    setOpenSubmissionList(false)
    console.log("handleOpenSubmissionList");
  } 
  const[openUpdateTask,setOpenUpdateTask]=useState(false)
  const handleRemoveTaskIdParams=()=>{
    
  }
   const handleOpenUpdateTaskModel=()=>{
    
    setOpenUpdateTask(true)
    const updatedParams = new URLSearchParams(location.search)
    updatedParams.set("taskId",item.id)
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    handleMenuClose()
    console.log("handleOpenUpdateTaskModel");
  }
  const handleCloseUpdateTaskModel=()=>{
    setOpenUpdateTask(false)
    console.log("handleOpenUpdateTaskModel");
  }
  const handleDeleteTask=()=>{
    dispatch(deleteTask(item.id))
    handleMenuClose()
    console.log("handleDeleteTask");
  }
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const role = "ROLE_ADMIN"

  const[openSubmitFormModel,setOpenSubmitFormModel]=useState(false)

  const handleCloseSubmitFormModel=()=>{
    setOpenSubmitFormModel(false)
  }
  
  const handleOpenSubmitFormModel=()=>{
    const updatedParams = new URLSearchParams(location.search)
    updatedParams.set("taskId",item.id)
    navigate(`${location.pathname}?${updatedParams.toString()}`)
    setOpenSubmitFormModel(true)
    handleMenuClose()
  }

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div>
            <img
              className="lg:w-[7rem] lg:h-[7rem] object-cover"
              src={item.image}
              alt=""
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{item.title}</h1>
              <p className="text-grey-500 text-sm">
                {item.description}
              </p>
              <p className="font-semibold text-lg text-rose-400 ">Deadline :  {item.deadline.substring(0,10).split('-').reverse().join(" - ")}</p>

            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {item.tags.map((item, i) => (
                <span className="py-1 px-5 rounded-full techStack" key={i}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
        <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleMenuClick}
          >
            <MoreVertIcon/>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user?.role == "ROLE_ADMIN" ? (
              <div>
                <MenuItem onClick={handleOpenUserList} >Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  see submissions
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel} >Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask} >Delete</MenuItem>
              </div>
            ) : (
              <>
              <MenuItem onClick={handleOpenSubmitFormModel} >submit</MenuItem>
              </>
            )}
          </Menu>
        </div>
        </div>
        <UserList open={openUserList} handleClose={handleCloseUserList}/>
        <SubmissionList open={openSubmissioList} handleClose={handleCloseSubmissionList}/>
        <EditTaskForm item={item} open={openUpdateTask} handleClose={handleCloseUpdateTaskModel}/>
        <SubmitForm open={openSubmitFormModel} handleClose={handleCloseSubmitFormModel}/>
        </div>
        
         
  );
};

export default TaskCard;

import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import {useLocation,useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import "./Sidebar.css";
import CreateNewTaskForm from "../task/CreateTask";
import { logout } from "../../redux/AuthSlice";

const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "", role: ["ROLE_ADMIN"] },
  { name: "Notifications", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];
var role;
const Sidebar = () => {
  const dispatch = useDispatch()
  const{auth}=useSelector(store=>store);
  role = auth.user.role
  const location = useLocation()
  const navigate =useNavigate()
  const [activeMenu,setActiveMenu] = useState("Home")
  const handleMenuChange= (item)=>{
    const updatedParams=new URLSearchParams(location.search)
    if(item.name=="Create New Task"){
      handleOpenCreateTaskForm()
    }
    else if(item.name =="Home"){
      updatedParams.delete("filter")
      const queryString =updatedParams.toString();

      const updatedPath = queryString ?`${location.pathname}?${queryString}`:location.pathname;
      navigate(updatedPath)
    }
    else{
      updatedParams.set("filter",item.value)
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    }
    setActiveMenu(item.name)
  }

  const[openCreateTaskForm,setOpenCreateTaskForm]=useState(false)
  const handleCloseCreateTaskForm=()=>{
      setOpenCreateTaskForm(false)
  }
  const handleOpenCreateTaskForm=()=>{
    setOpenCreateTaskForm(true)
  }
  const handleLogout=()=>{
    dispatch(logout())
    console.log("handle logout");
  }
  
  return (
    <>
      <div className="card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[#c24dd0]"
            >
              c
            </Avatar>
          </div>
          {menu.filter((item,index)=>item.role.includes(role))
          .map((item,i)=><p key={i} onClick={()=>handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu ===item.name?"activeMenuItem":"menuItem"}`}>
            {item.name}
          </p>)
          }
          <Button
            sx={{ padding: ".7rem", borderRadius: "2rem" }}
            fullWidth
            className="logoutButton"
            onClick={()=>handleLogout()}
          >
            logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm} />
    </>
  );
};

export default Sidebar;

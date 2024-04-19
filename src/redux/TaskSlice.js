import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL, api, setAuthHeader } from '../api/Api'

export const fetchTasks = createAsyncThunk("task/fetchTasks",async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.get("/api/tasks",{
            params:{status}
        });
        console.log("fetch tasks",data);
        return data;
    } catch (error) {
        console.log("error in fetchTasks",error);
        throw Error(error.response.data.error)
    }
})

export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks",async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.get("/api/tasks/user",{
            params:{status}
        });
        console.log("fetch fetchUsersTasks",data);
        return data;
    } catch (error) {
        console.log("error in fetchUsersTasks",error);
        throw Error(error.response.data.error)
    }
})

export const fetchTasksById = createAsyncThunk("task/fetchTasksById",async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.get(`/api/tasks/${taskId}`);
        console.log("fetch fetchTasksById",data);
        return data;
    } catch (error) {
        console.log("error in fetchTasksById",error);
        throw Error(error.response.data.error)
    }
})

export const createTask = createAsyncThunk("task/createTask",async(taskData)=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.post(`/api/tasks/`,taskData);
        console.log("fetch createTask",data);
        return data;
    } catch (error) {
        console.log("error in createTask",error);
        throw Error(error.response.data.error)
    }
})

export const updateTask = createAsyncThunk("task/updateTask",async({updatedTaskData,id})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.put(`/api/tasks/${id}`,updatedTaskData);
        console.log("method updateTask",data);
        return data;
    } catch (error) {
        console.log("error in updateTask",error);
        throw Error(error.response.data.error)
    }
})

export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser",async({taskId,userId})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
        console.log("method assignedTaskToUser",data);
        return data;
    } catch (error) {
        console.log("error in assignedTaskToUser",error);
        throw Error(error.response.data.error)
    }
})

export const deleteTask = createAsyncThunk("task/deleteTask",async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const {data} = await api.delete(`/api/tasks/${taskId}`);
        console.log("method deleteTask",data);
        return taskId;
    } catch (error) {
        console.log("error in deleteTask",error);
        throw Error(error.response.data.error)
    }
})

const taskSlice=createSlice({
    name:"task",
    initialState:{
        tasks:[],
        loading:false,
        error:null,
        taskDetails:null,
        usersTask:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTasks.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks=action.payload
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        .addCase(fetchTasksById.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchTasksById.fulfilled,(state,action)=>{
            state.loading=false
            state.taskDetails=action.payload
        })
        .addCase(fetchTasksById.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        .addCase(fetchUsersTasks.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUsersTasks.fulfilled,(state,action)=>{
            state.loading=false
            state.usersTask=action.payload
        })
        .addCase(fetchUsersTasks.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        .addCase(createTask.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
        
        .addCase(updateTask.fulfilled,(state,action)=>{
            const updatedTask =action.payload
            state.loading=false
            state.tasks=state.tasks.map((task)=>
                task.id === updatedTask.id ? {...task, ...updatedTask}:task
            );
        })
        .addCase(assignedTaskToUser.fulfilled,(state,action)=>{
            const updatedTask =action.payload
            state.loading=false
            state.tasks=state.tasks.map((task)=>
                task.id === updatedTask.id ? {...task, ...updatedTask}:task
            );
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks=state.tasks.filter((task)=>task.id !==action.payload )
        })
       
    }
    
})


export default taskSlice.reducer;
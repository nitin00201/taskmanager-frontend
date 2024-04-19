import React, { useEffect, useState } from 'react';
import { Box, Grid, Modal, TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch , useSelector} from 'react-redux'
import { fetchTasksById, updateTask } from '../../redux/TaskSlice';
import {useLocation} from 'react-router-dom'
import { submitTask } from '../../redux/SubmissionSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SubmitForm({item, handleClose, open }) {

  const dispatch = useDispatch();
const {task} =useSelector(store=>store);
const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId")

  const [formData, setFormData] = useState({
    githubLink: '',
    description: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( "in submit model task",formData);
dispatch(submitTask({taskId:taskId,githubLink:formData.githubLink}))
    handleClose();
  };
 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    label="githubLink"
                    fullWidth
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    className="customButton"
                    sx={{ padding: '.9rem' }}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

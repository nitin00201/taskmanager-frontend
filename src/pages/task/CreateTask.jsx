import React, { useState } from 'react';
import { Box, Grid, Modal, TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useDispatch , useSelector} from 'react-redux'
import { createTask } from '../../redux/TaskSlice';


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

export default function CreateNewTaskForm({ handleClose, open }) {

  const dispatch = useDispatch();
  const {task,auth}= useSelector(store =>store)
  

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    tags: [],
    deadline: new Date(),
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };

  const tagsList = ["Angular","React js","springboot","MySQL","MongoDB","Java","Dot Net","Node js","Vue js"];

  const handleDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };
  const formatDate=(input)=>{
    let{
      $y: year,
    $M : month,
    $D:day,
    $H:hours,
    $m:minutes,
    $s:seconds,
    $ms:miliseconds
    } = input;
    const date = new Date(year,month,day,hours,minutes,seconds,miliseconds);
    const formatedDate = date.toISOString();
    return formatedDate;
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { deadline } = formData;
    formData.deadline=formatDate(deadline)
    formData.tags=selectedTags
    console.log("formdata in create task",formData);
    dispatch(createTask(formData))
    console.log(task);

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
                    label="Title"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image"
                    fullWidth
                    name="image"
                    value={formData.image}
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
                  <Autocomplete
                    multiple
                    id="multiple-limit-tags"
                    options={tagsList}
                    value={selectedTags}
                    onChange={handleTagsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tags"
                        placeholder="Select Tags"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimePicker
                  className='w-full'
                    onChange={handleDeadlineChange}
                    renderInput={(params) => <TextField {...params} />}
                    label="Deadline"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    className="customButton"
                    sx={{ padding: '.9rem' }}
                    type='submit'
                  >
                    Create
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

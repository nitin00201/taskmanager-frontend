import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button ,IconButton} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch , useSelector} from 'react-redux'
import { acceptDeclineSubmission } from '../../redux/SubmissionSlice';


const SubmissionCard = ({item}) => {
    const dispatch = useDispatch()
    const handleAcceptOrDecline=(status)=>{
        dispatch(acceptDeclineSubmission({id:item.id,status}))
        console.log(status);
    }
  return (
    <div className='rounder-md bg-black p-5 flex items-center justify-between'>
    <div className='space-y-2'>
    <div className='flex items-center gap-2'>
        <span>Git hub:</span>
        <div className='flex items-center gap-2 text-[#c24dd0]'>
            <OpenInNewIcon />
            <a href={item.githubLink} target='_blank'>Go to link</a>
        </div>
    </div>
<div className='flex items-center gap-2 text-xs'>
<p>Submission Time :</p>
<p className='text-gray-400'> {item.submissionTime}</p>
</div>

    </div>
    <div>
        {
            item.status=='PENDING'?<div className='flex gap-5'>
            <div className='text-green-500'>
            <IconButton color='success' onClick={()=>handleAcceptOrDecline("ACCEPTED")}>
                <CheckIcon/>
            </IconButton>
            </div>
            <div className='text-red-500'>
            <IconButton color='error' onClick={()=>handleAcceptOrDecline("DECLINE")}>
                <CloseIcon/>
            </IconButton>
            </div>
            </div>:<Button color={item.status  === 'ACCEPTED'?"success":"error"} size='small' variant='outlined' >
            {item.status  === 'ACCEPTED'?"ACCEPTED":"declined"}
            </Button>
        }
    </div>
    </div>
  )
}

export default SubmissionCard
import React, { useEffect } from 'react';
import Box from '@mui/material/Box'; 
import { useSelector, useDispatch } from 'react-redux';   
import { useNavigate } from "react-router-dom";
import Topwithslidebar from '../dashboard/components/Topwithslidebar';
import AddCampaign from '../dashboard/components/AddCampaign';
import DashboardList from '../dashboard/components/DashboardList';
import { Stack} from '@mui/material';
import {retrieveCampaign,selectAllData,getDataStatus,getDataError} from '../../redux/campaignSlice'

const Campaign = () => {
    const dispatch = useDispatch();
    const camData = useSelector(selectAllData); 
    const camstatus = useSelector(getDataStatus);
    const error = useSelector(getDataError);  
    const navigate = useNavigate();

    useEffect(() => {
        if (camstatus === 'idle') {
          dispatch(retrieveCampaign());
        }
      }, [camstatus, dispatch]);
    const handleClick = () => {
      navigate("/login");
    }
  
    if (camData.message === "Session expired") {
      handleClick();
    } else {
      return (
        <Box  sx={{ mt:10,ml:4}}>
        <Topwithslidebar  />
       <Stack sx={{pl:10,pr:10,mt:4}}> 
         <div>
           <AddCampaign/>
         </div>
         <Box sx={{mt:1}}>
         <DashboardList />
         </Box>
       </Stack>
     </Box>
      );
    }
}

export default Campaign
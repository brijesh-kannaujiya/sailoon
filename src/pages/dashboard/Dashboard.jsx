import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
import UserDetail from './components/UserDetail';
import { Stack,Typography ,Divider,Button} from '@mui/material';
import Topwithslidebar from './components/Topwithslidebar';
import DashboardList from './components/DashboardList';
import {StatBox} from './components/StatBox';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector, useDispatch } from 'react-redux';
import {retrieveCampaign,selectAllData,getDataStatus,getDataError} from '../../redux/campaignSlice'
import styles from '../dashboard/dashboardstyle.module.css';
import AddCampaign from './components/AddCampaign';
import { useNavigate} from "react-router-dom";

const axios = require('axios');
const Dashboard = () => {
  const dispatch = useDispatch();
  const camData = useSelector(selectAllData);
  const camstatus = useSelector(getDataStatus);
  const error = useSelector(getDataError);
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/login");
  }
  useEffect(() => {
    if (camstatus === 'idle') {
      dispatch(retrieveCampaign());
    }
  }, [camstatus, dispatch]);
  if(camData.message==="Session expired"){
    handleClick();
  }else{
  return (
    <Box  sx={{ mt:10,ml:4}}>
       <Topwithslidebar  />
      <Stack sx={{pl:10,pr:10,mt:4}}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
       // gridAutoRows="140px"
        gap="20px"
      >
          <StatBox title={`Total Users : ${"5"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#1F2A40'}/>
          <StatBox title={`Total Campaign : ${"5"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#009688'}/>
          <StatBox title={`Total Winner User : ${"0"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#e65100'}/>
          <StatBox title={`Total Sell Products : ${"0"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#607d8b'}/>
        </Box>
        <div>
          <AddCampaign/>
       
        </div>
        <Box sx={{mt:1}}>
        <DashboardList />
        </Box>
      </Stack>
    </Box>
  )
}
}

export default Dashboard
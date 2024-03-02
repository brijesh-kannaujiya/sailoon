import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
// import UserDetail from './components/UserDetail';
import { Stack} from '@mui/material';
import Topwithslidebar from '../dashboard/components/Topwithslidebar';
import {StatBox} from '../dashboard/components/StatBox';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector, useDispatch } from 'react-redux';


import { useNavigate} from "react-router-dom";
import { openstatusss } from '../../redux/AllapplicationStatus';

import UserList from './UserList';
import { retrieveUser, selectAllUserData,getDataStatus } from '../../redux/userlistSlice';

// const axios = require('axios');
const ManageUsers = () => {
  const dispatch = useDispatch();
  const camData = useSelector(selectAllUserData);
  const camstatus = useSelector(getDataStatus);
  const openstatus= useSelector(openstatusss);
  // const error = useSelector(getDataError);
 
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/");
  }
  useEffect(() => {
    if (camstatus === 'idle') {
      dispatch(retrieveUser());
    }
  }, [camstatus, dispatch]);
  if(camData.message==="Session expired"){
    handleClick();
  }else{
  return (
    <>
    {/* openstatus===true ? 50 : 1 */}
    <Topwithslidebar  />
    <Box  sx={{mt:10,ml:openstatus===true ? 30 :10}}>
      <Stack sx={{pl:2,pr:2,mt:4}}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
       // gridAutoRows="140px"
        gap="20px"
      >
          <StatBox title={`Total Users : ${camData.users.length}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#1F2A40'}/>
          <StatBox title={`Total Campaign : ${"0"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#009688'}/>
          <StatBox title={`Total Winner User : ${"0"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#e65100'}/>
          <StatBox title={`Total Sell Products : ${"0"}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#607d8b'}/>
        </Box>
        <div>
         
        </div>
        <Box sx={{mt:1}}>
        <UserList />
        </Box>
      </Stack>
    </Box>
    </>
  )
}
}

export default ManageUsers
// import  React,{useEffect,useState} from 'react';
// import { DataGrid} from "@mui/x-data-grid";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Stack,Box,Tooltip} from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux'
// import {getUserList} from '../../dashboard/userredux/useraction'
// import Progress from '../../../components/Progress';
// import {StatBox} from './StatBox';
// import EmailIcon from "@mui/icons-material/Email";
// import GroupIcon from '@mui/icons-material/Group';
// const onButtonClick = (e, row) => {
//     e.stopPropagation();
//     //do whatever you want with the row
// };

// const columns = [
//   { field: 'Sno', headerName: 'Sno', width: 70},
//   { field: 'name', headerName: 'First Name', width: 130 },
//   { field: 'unique_id', headerName: 'Unique ID', width: 130 },
//   {
//     field: 'email',
//     headerName: 'Email Id',
//     width: 200,
//   },
//   {
//     field: 'mobile',
//     headerName: 'Contact no',
//     //sortable: false,
//     type: 'number',
//     width: 130,
//   },
//   {
//     field: 'assign_country',
//     headerName: 'Assigned Country',
//     //sortable: false,
//     width: 130,
//   },
//   {
//     field: 'created_at',
//     headerName: 'Reg. Date',
//     //sortable: false,
//     width: 130,
   
//   },
//   {field: "action",
//   headerName: "Action",
//   sortable: false,
//    renderCell: (params) => {
//     return (
//       <Stack direction={'row'}>
//       <Box sx={{border:1}}> 
//       <Tooltip title="Edit">
//       <IconButton aria-label="Edit">
//       <EditIcon />
//     </IconButton>
//     </Tooltip>
//     </Box> 
//     <Box sx={{border:1}}> 
//     <Tooltip title="Delete">
//     <IconButton aria-label="delete">
//       <DeleteIcon />
//     </IconButton>
//     </Tooltip>
//     </Box> 
//     </Stack>
//     );
//   } 
// }
// ];


// const UserDetail=()=> {
//   const dispatch = useDispatch()
//   const [rows,setRows]=useState("");
//   let userList=useSelector((state)=>state.userReducer.userList)
//   let isloding=useSelector((state)=>state.userReducer.isloding)
//   useEffect(() => {
//     //Runs only on the first render
//     dispatch(getUserList(true))
//   },[]);

//   useEffect(()=>{
//     if(userList.length!==0){
//      setRows(userList.data)
//     }
//   },[userList])
  
//   return (
//     <div style={{width: '99%' }}>
//       {userList.length!==0 &&
//       (<Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//        // gridAutoRows="140px"
//         gap="20px"
//       >
//           <StatBox title={`Total Users : ${userList.data.length}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#1F2A40'}/>
//           <StatBox title={`Total Users : ${userList.data.length}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#009688'}/>
//           <StatBox title={`Total Users : ${userList.data.length}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#e65100'}/>
//           <StatBox title={`Total Users : ${userList.data.length}`} icon={<GroupIcon sx={{color:'#fff'}}/>} colorss={'#607d8b'}/>
//         </Box>)}
//        <Box sx={{mt:2}}>
//       {isloding!==true ?
//       (<DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />):(<Progress></Progress>)}
//       </Box>
//     </div>
//   );
 
// }

// export default UserDetail;
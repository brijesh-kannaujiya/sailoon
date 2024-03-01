import { Axios } from "axios";
import React, { useEffect, useState } from "react";  
import { getCategoryDetail, selectAllCategories } from "../../redux/categorySlice";
import Dialog from "@mui/material/Dialog"; 
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import 'react-toastify/dist/ReactToastify.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Progressshows from "../../components/AllLoaders/Progressshows";

const EditCategory = (props) => {
  const [isloading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const editdetailData = useSelector(getCategoryDetail);
 //alert(JSON.stringify(editdetailData))
  const [datashow,setDatashow]=useState({}); 
  console.log(editdetailData.result);
  useEffect(() => {
    if(editdetailData!==""){ 
     setDatashow(editdetailData.result);
    }
   }, []);

  const handelUpdate = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const uuid = formJson.uuid;
    const name = formJson.name;
    const name_ar = formJson.name_ar;
    const status = 1;
    let data = new FormData();
    data.append("name", name);
    data.append("name_ar", name_ar);
    data.append("uuid", uuid);
    data.append("status", status);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_PATH + process.env.REACT_APP_CATEGORY,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: data,
    };
    Axios.request(config)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message, {
            position: "top-right",
          });
          dispatch(selectAllCategories());
        } else {
          // toast.error(response.data.message, {
          //   position: "top-right",
          // });
        }
        setLoading(false);
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth={"md"}
        // maxWidth={"md"}
        onClose={props.handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handelUpdate,
        }}
      > 
          <Toolbar> 
            <Typography sx={{ ml: 2, flex: 1}} variant="h6" component="div">
              Edit Category
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar> 

          <DialogContent>
         
         <Stack direction={"row"} style={{flex:1}}>
          <div style={{flex:0.50}}>
           <label>Camapign name in english</label>
           <TextField
             autoFocus
             required
             value={datashow.name}
             margin="dense"
             id="name"
             name="name_en"
             label="Category Name"
             type="text"
             fullWidth
             variant="standard"
             onChange={(e) => setDatashow({...datashow,cp_name:e.target.value})}
           />
           </div>
           <div style={{marginLeft:10,flex:0.50}}>
           <label>Campaign name in arbic</label>
           <TextField
             autoFocus
             required
             value={datashow.name_ar}
             margin="dense"
             id="name_ar"
             name="name_ar"
             label="Category Name"
             type="text"
             fullWidth
             variant="standard"
             onChange={(e) => setDatashow({...datashow,cp_name_ar:e.target.value})}
           />
           </div>
          </Stack>
  
          {isloading===true &&(<Progressshows />)}
         </DialogContent>
         <DialogActions>
           <Button onClick={props.handleClose}>Cancel</Button>
           <Button type='submit'>Update</Button>
         </DialogActions>


      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EditCategory;

import Button from "@mui/material/Button";
import React, { useState } from "react";
import styles from "../dashboard/dashboardstyle.module.css";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Progressshows from "../../components/AllLoaders/Progressshows";
import DialogActions from "@mui/material/DialogActions"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retrieveCategories } from "../../redux/categorySlice";


// components/AllLoaders/Progressshows

const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => { 
    setOpen(true);
  };
   
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()); 
    const name = formJson.name_en;
    const name_ar = formJson.name_ar; 
    const status = 1; 
    let data = new FormData();
    data.append("name", name);
    data.append("name_ar", name_ar); 
    data.append("status", status); 
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_PATH + process.env.REACT_APP_CATEGORY,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setLoading(false);
        if (response.data.status === "success") {
          toast.success(response.data.message, {
            position: "top-right",
          });
          handleClose();
          dispatch(retrieveCategories());
        } else { 
          console.log(response.data.message);
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
   
        //
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className={styles.addbutton}
        onClick={handleClickOpen}
      >
        Add Category
      </Button>

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"md"}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Category name in english</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name_en"
                name="name_en"
                label="Category Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Category name in arbic</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name_ar"
                name="name_ar"
                label="Category Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div> 
          </Stack> 
 
          {isloading === true && <Progressshows />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AddCategory;

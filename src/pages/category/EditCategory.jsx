import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getCategoryDetail,
  retrieveCategories,
  selectAllCategories,
} from "../../redux/categorySlice";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
// import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progressshows from "../../components/AllLoaders/Progressshows";

const EditCategory = (props) => {
  const [isloading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const editdetailData = useSelector(getCategoryDetail);
  const [datashow, setDatashow] = useState({});
  useEffect(() => {
    if (editdetailData !== "") {
      setDatashow(editdetailData.categories);
    }
  }, []);
  const handelUpdate = (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name_en;
    const name_ar = formJson.name_ar;
    const status = 1;
    let data = {
      name: name,
      name_ar: name_ar,
      uuid: datashow.uuid,
      status: status,
    };
    let config = {
      method: "PUT",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_PATH + process.env.REACT_APP_CATEGORY,
      headers: {
        Authorization: localStorage.getItem("token"),
        contentType: "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        if (response.data.status === "success") {
          props.handleClose();
          toast.success(response.data.message, {
            position: "top-right",
          });
          dispatch(retrieveCategories());
        } else {
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
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
        onClose={props.handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handelUpdate,
        }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Camapign name in english</label>
              <TextField
                autoFocus
                required
                value={datashow.name}
                margin="dense"
                id="name_en"
                name="name_en"
                label="Category Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setDatashow({ ...datashow, name: e.target.value })
                }
              />
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
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
                onChange={(e) =>
                  setDatashow({ ...datashow, name_ar: e.target.value })
                }
              />
            </div>
          </Stack>

          {isloading === true && <Progressshows />}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EditCategory;

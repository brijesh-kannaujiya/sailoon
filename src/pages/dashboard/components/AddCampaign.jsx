import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../dashboard/dashboardstyle.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import winnerapisService from "../../../services/winnerapis.service";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import Progressshows from "../../../components/AllLoaders/Progressshows";
import { useSelector, useDispatch } from "react-redux";
import { retrieveCampaign } from "../../../redux/campaignSlice";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);
  const [data, setData] = useState({ dealimg: "", productimg: "" });
  const [filePath_d, setFilePath_d] = useState("");
  const [filePath2_d, setFilePath2_d] = useState("");
  const [filePath, setFilePath] = useState("");
  const [filePath2, setFilePath2] = useState("");
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    console.log("file name " + event.target.files);
    const file = event.target.files[0];
    setFilePath_d(file);
    if (file) {
      setFilePath(URL.createObjectURL(file));
    }
  };
  const handleFileChange2 = (event) => {
    // console.log("file name2222 "+JSON.stringify(event.target.files))
    const file = event.target.files[0];
    setFilePath2_d(file);
    if (file) {
      setFilePath2(URL.createObjectURL(file));
    }
  };
  const notify = () => toast("Wow so easy!");
  const handleClickOpen = () => {
    setOpen(true);
    // notify();
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_API_PATH + process.env.REACT_APP_CATEGORY,
      headers: {
        Authorization: localStorage.getItem("token"),
      }, 
    };
    axios
      .request(config)
      .then((response) => {
        // alert("hello");
        console.log("dfscvghjnefked");
        console.log(JSON.stringify(response.data)); 
      })
      .catch((error) => {
        // console.log(error);
        // setLoading(false);
      });
  }, []);

  const addDealsData = () => {
    let formData = new FormData();
    //formData.append('pic1', event.target.myimage.files[0]);
  };

  function converToLocalTime(serverDate) {
    let date = new Date(serverDate);
    var dateStr =
      date.toISOString().split("T")[0] +
      " " +
      date.toTimeString().split(" ")[0];
    return dateStr;
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        className={styles.addbutton}
        onClick={handleClickOpen}
      >
        Add Campaign
      </Button>
      <Dialog
        open={open}
        fullScreen
       // fullWidth={true}
        //maxWidth={"md"}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const cp_name = formJson.campainname_en;
            const cp_name_ar = formJson.campainname_ar;
            const dealprice = formJson.Price;
            const shortdiscription = formJson.shortdiscription;
            const longdiscription = formJson.longdiscription;
            const cp_product_name = formJson.productname_en;
            const tagtitle = "tagtitile";
            const joindeal_count = formJson.campain_join_count;
            const deal_startdate = formJson.startdate;
            const deal_enddate = formJson.enddate;
            const cp_status = 1;
            let sdate = converToLocalTime(deal_startdate);
            let edate = converToLocalTime(deal_enddate);
            //alert(sdate+" "+edate)
            let data = new FormData();
            data.append("cp_name", cp_name);
            data.append("campainname_ar", cp_name_ar);
            data.append("cp_price", dealprice);
            data.append("cp_shortdiscription", shortdiscription);
            data.append("cp_longdiscription", longdiscription);
            data.append("cp_tagtitle", "tagtitttrrr");
            data.append("cp_joindeal_count", joindeal_count);
            data.append("cp_startdate", converToLocalTime(deal_startdate));
            data.append("cp_enddate", converToLocalTime(deal_enddate));
            data.append("cp_status", cp_status);
            data.append("avatar", filePath_d);
            data.append("avatar_product", filePath2_d);
            data.append("cp_product_name", cp_product_name);
            data.append("cp_product_price", "");
            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url:
                process.env.REACT_APP_API_PATH +
                process.env.REACT_APP_ADD_CAMPAIGN,
              headers: {
                Authorization: localStorage.getItem("token"),
              },
              data: data,
            };
            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.status === "success") {
                  toast.success(response.data.message, {
                    position: "top-right",
                  });
                  dispatch(retrieveCampaign());
                } else {
                  toast.error(response.data.message, {
                    position: "top-right",
                  });
                }
                setLoading(false);
                handleClose();
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          },
        }}
      >
          <AppBar sx={{ position: 'relative',backgroundColor:'#320085;',color:'#FFF' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Campaign
            </Typography>
          </Toolbar>
        </AppBar>
      
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Campaign
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
        </IconButton> */}
        <DialogContent>
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Camapign name in english</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="campainname_en"
                name="campainname_en"
                label="Campaign Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Campaign name in arbic</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="campainname_ar"
                name="campainname_ar"
                label="Capaign Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
          </Stack>

          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Product name in english</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="productname_en"
                name="productname_en"
                label="Product Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Product name in arbic</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="productname_ar"
                name="productname_ar"
                label="Product Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
          </Stack>
          {/* const file = event.target.files[0]; */}
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>deal Image</label>
              <br></br>
              <input type="file" onChange={handleFileChange} />
              {filePath && (
                <img
                  src={filePath}
                  alt="Uploaded file"
                  style={{ width: 80, height: 50 }}
                />
              )}
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Product Image</label>
              <input type="file" onChange={handleFileChange2} />
              {filePath && (
                <img
                  src={filePath2}
                  alt="Uploaded file"
                  style={{ width: 80, height: 50 }}
                />
              )}
            </div>
          </Stack>

          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Campaign Price</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="Price"
                name="Price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
              />
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Campaign Join Count</label>
              <TextField
                autoFocus
                required
                margin="dense"
                id="campain_join_count"
                name="campain_join_count"
                label="Number of Persion Join"
                type="number"
                fullWidth
                variant="standard"
              />
            </div>
          </Stack>

          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Campaign Start Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    disablePast
                    label="Start date time"
                    id="startdate"
                    name="startdate"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Campaign End Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    disablePast
                    label="End date time"
                    id="enddate"
                    name="enddate"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Stack>
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Short Discription</label>
              <textarea
                id="shortdiscription"
                name="shortdiscription"
                rows="4"
                cols="50"
                className={styles.textarea}
              ></textarea>
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Long Discription</label>
              <textarea
                id="longdiscription"
                name="longdiscription"
                rows="4"
                cols="50"
                className={styles.textarea}
              ></textarea>
            </div>
          </Stack>
          <Stack direction={"row"} style={{ flex: 1 }}>
            <div style={{ flex: 0.5 }}>
              <label>Short Discription arbic</label>
              <textarea
                id="shortdiscription_ar"
                name="shortdiscription_ar"
                rows="4"
                cols="50"
                className={styles.textarea}
              ></textarea>
            </div>
            <div style={{ marginLeft: 10, flex: 0.5 }}>
              <label>Long Discription arbic</label>
              <textarea
                id="longdiscription_ar"
                name="longdiscription_ar"
                rows="4"
                cols="50"
                className={styles.textarea}
              ></textarea>
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
}

import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from '../../dashboard/dashboardstyle.module.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import winnerapisService from '../../../services/winnerapis.service';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs'
import Progressshows from '../../../components/AllLoaders/Progressshows';
import EditIcon from '@mui/icons-material/Edit';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaignDetailAll, getDetails, retrieveCampaign } from '../../../redux/campaignSlice';
import dayjs from 'dayjs';
export default function EditCampaign(props) {
  //const [open, setOpen] = React.useState(false);
  const [isloading, setLoading] = React.useState(false);
  const [datashow,setDatashow]=useState({});
  const [filePath_d, setFilePath_d] = useState('');
  const [filePath2_d, setFilePath2_d] = useState('');
  const [filePath, setFilePath] = useState('');
  const [filePath2, setFilePath2] = useState('');
  const [d_filePath2, setFilePath_D] = useState('');
  const [p_filePath2, setFilePath_P] = useState('');
  
  const editdetailData = useSelector(getCampaignDetailAll);
  const dispatch = useDispatch();
  useEffect(() => {
   if(editdetailData!==""){
    //alert(editdetailData.result.image_name)
    //alert(editdetailData.result.product_image)
    setDatashow(editdetailData.result);
    setFilePath_D(process.env.REACT_APP_API_PATH+"campaignapi/deal_image/"+editdetailData.result.image_name)
    setFilePath_P(process.env.REACT_APP_API_PATH+"campaignapi/deal_image_product/"+editdetailData.result.product_image)
   }
  }, []);
  const handleFileChange = (event) => {
    //console.log("file name "+event.target.files)
    const file = event.target.files[0];
      setFilePath_d(file)
      //alert("ssss111")
    if (file) {
      setFilePath_D('')
      setFilePath(URL.createObjectURL(file));
    }
  };
  const handleFileChange2 = (event) => {
   // console.log("file name2222 "+JSON.stringify(event.target.files))
   //alert("ssss22")
    const file = event.target.files[0];
       setFilePath2_d(file)
    if (file) {
      setFilePath_P('')
      setFilePath2(URL.createObjectURL(file));
    }
  };
  const notify = () => toast("Wow so easy!");
 
const addDealsData=()=>{
  let formData = new FormData();
   //formData.append('pic1', event.target.myimage.files[0]);
}

function converToLocalTime(serverDate) {

  let date = new Date(serverDate);
  var dateStr=date.toISOString().split('T')[0] + ' '
      + date.toTimeString().split(' ')[0]
  return dateStr;
}

//alert(d_filePath2)

  return (
    <React.Fragment>
       {/* <Tooltip title="Edit">
      <IconButton aria-label="Edit" onClick={handleClickOpen}>
      <EditIcon />
    </IconButton>
    </Tooltip> */}
       {/* <Button variant="contained" className={styles.addbutton} onClick={handleClickOpen}>Add Campaign</Button> */}
      <Dialog
        open={props.open}
        fullScreen
        onClose={props.handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            setLoading(true);
            //deal_id
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const cp_name = formJson.campainname_en;
          const dealprice = formJson.Price;
          const shortdiscription = formJson.shortdiscription;
          const longdiscription = formJson.longdiscription;
          const cp_product_name = formJson.productname_en;
          const tagtitle = "tagtitile";
          const joindeal_count = formJson.campain_join_count;
          const deal_startdate = formJson.startdate;
          const deal_enddate = formJson.enddate;
          const cp_status = 1;
          let sdate=converToLocalTime(deal_startdate);
          let edate=converToLocalTime(deal_enddate);
          //alert(sdate+" "+edate)
          let data = new FormData();
          data.append('deal_id', btoa(datashow.deal_id));
          data.append('cp_name', cp_name);
          data.append('cp_price', dealprice);
          data.append('cp_shortdiscription', shortdiscription);
          data.append('cp_longdiscription', longdiscription);
          data.append('cp_tagtitle', 'tagtitttrrr');
          data.append('cp_joindeal_count', joindeal_count);
          data.append('cp_startdate', converToLocalTime(deal_startdate));
          data.append('cp_enddate', converToLocalTime(deal_enddate));
          data.append('cp_status', cp_status);
          data.append("avatar",filePath_d);
          data.append("avatar_product",filePath2_d);
          data.append('cp_product_name', cp_product_name);
          data.append('cp_product_price', '');
            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_PATH+process.env.REACT_APP_UPDATE_CAMPAIGN,
            headers: { 
            'Authorization': localStorage.getItem("token"), 
            },
            data : data
            };
            axios.request(config)
            .then((response) => {
            //console.log(JSON.stringify(response.data));
            //alert(JSON.stringify(response))
            if(response.data.status==="success"){
              //alert(response.data.message)
              toast.success(response.data.message, {
                position: 'top-right',
              });
              dispatch(retrieveCampaign());
              //dispatch(getDetails(btoa(datashow.deal_id)))
            }else{
              toast.error(response.data.message, {
                position: 'top-right',
              });
            }
            setLoading(false);
            props.handleClose();
            })
            .catch((error) => {
            console.log(error);
            setLoading(false);
            });
           
          },
        }}
      >
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Campaign
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
         
        <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>Camapign name in english</label>
          <TextField
            autoFocus
            required
            value={datashow.cp_name}
            margin="dense"
            id="campainname_en"
            name="campainname_en"
            label="Campaign Name"
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
            value={datashow.cp_name}
            margin="dense"
            id="campainname_ar"
            name="campainname_ar"
            label="Capaign Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDatashow({...datashow,cp_name:e.target.value})}
          />
          </div>
         </Stack>

         <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>Product name in english</label>
          <TextField
            autoFocus
            required
            value={datashow.product_name}
            margin="dense"
            id="productname_en"
            name="productname_en"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDatashow({...datashow,product_name:e.target.value})}
          />
          </div>
          <div style={{marginLeft:10,flex:0.50}}>
          <label>Product name in arbic</label>
          <TextField
            autoFocus
            required
            margin="dense"
            value={datashow.product_name}
            id="productname_ar"
            name="productname_ar"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDatashow({...datashow,product_name:e.target.value})}
          />
          </div>
         </Stack>
         {/* const file = event.target.files[0]; */}
         <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>deal Image</label><br></br>
          <input type="file" onChange={handleFileChange} />
      {d_filePath2 && <img src={d_filePath2} alt="Uploaded file"  style={{width:80,height:50}}/>}
      {filePath && <img src={filePath} alt="Uploaded file"  style={{width:80,height:50}}/>}
         
          </div>
          <div style={{marginLeft:10,flex:0.50}}>
          <label>Product Image</label>
          <input type="file" onChange={handleFileChange2} />
          {p_filePath2 && <img src={p_filePath2} alt="Uploaded file"  style={{width:80,height:50}}/>}
          {filePath2 && <img src={filePath2} alt="Uploaded file"  style={{width:80,height:50}}/>}
          </div>
         </Stack>

         <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>Campaign Price</label>
          <TextField
            autoFocus
            required
            value={datashow.dealprice}
            margin="dense"
            id="Price"
            name="Price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setDatashow({...datashow,dealprice:e.target.value})}
          />
          </div>
          <div style={{marginLeft:10,flex:0.50}}>
          <label>Campaign Join Count</label>
          <TextField
            autoFocus
            required
            value={datashow.joindeal_count}
            margin="dense"
            id="campain_join_count"
            name="campain_join_count"
            label="Number of Persion Join"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setDatashow({...datashow,joindeal_count:e.target.value})}
          />
          </div>
         </Stack>

         <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>Campaign Start Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']} >
            <DateTimePicker  label="Start date time" id="startdate" name="startdate"   value={dayjs(datashow.deal_startdate)} 
             onChange={(e) => setDatashow({...datashow,deal_startdate:e.target.value})}
            />
            </DemoContainer>
            </LocalizationProvider>
          </div>
          <div style={{marginLeft:10,flex:0.50}}>
          <label>Campaign End Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']} >
            <DateTimePicker  label="End date time" id="enddate" name="enddate" 
              value={dayjs(datashow.deal_enddate)}
              onChange={(e) => setDatashow({...datashow,deal_enddate:e.target.value})}
            />
            </DemoContainer>
            </LocalizationProvider>
          </div>
         </Stack>
         <Stack direction={"row"} style={{flex:1}}>
         <div style={{flex:0.50}}>
          <label>Short Discription</label>
          <textarea id="shortdiscription" name="shortdiscription" rows="4" cols="50" className={styles.textarea} value={datashow.shortdiscription}
               onChange={(e) => setDatashow({...datashow,shortdiscription:e.target.value})}
          >
        
        </textarea>
          </div>
          <div style={{marginLeft:10,flex:0.50}}>
          <label>Long Discription</label>
          <textarea id="longdiscription" name="longdiscription" rows="4" cols="50" className={styles.textarea} value={datashow.longdiscription}
          onChange={(e) => setDatashow({...datashow,longdiscription:e.target.value})}
          >
        
        </textarea>
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
    </React.Fragment>
  );
}

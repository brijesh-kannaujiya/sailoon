
import React,{useEffect,useState} from "react"
import stylelogin from '../components/login.module.css'
import { useNavigate} from "react-router-dom";
import { getTokenApi } from "../normalapi";
import winnerapisService from "../services/winnerapis.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
const navigate = useNavigate();
const [data,setData]=useState({username:'',password:''});
const [message,setMessage]=useState('');

const getTokenV=async()=>{
   await getTokenApi().then((res)=>{
    //console.log(JSON.stringify(res))
    localStorage.setItem("token",res.token)
   }).catch((error)=>{
    console.log(error);
   })
}


const handleClick=async()=>{
  if(data.username==='' && data.password===''){
    //setMessage('User name password can not emapty !');
    toast.error("User name password can not emapty !", {
      position: 'top-right',
    });
  }
  else if(data.username===''){
    toast.error("User name can not emapty !", {
      position: 'top-right',
    });
    //setMessage('User name can not emapty !');
  }else if(data.password===''){
    toast.error("Password can not emapty !", {
      position: 'top-right',
    });
    //setMessage('Password can not emapty !');  
  }
  else{
   winnerapisService.adminLogin(data).then((res)=>{
        if(res.data.status==="false"){
          toast.error(res.data.message, {
            position: 'top-right',
          });
        }else{
          toast.success(res.data.message, {
            position: 'top-right',
          });
          navigate("/dashboard");
        }
      
   }).catch((error)=>{
       //alert(error)
   })
  }
}

useEffect(() => {
  getTokenV();
}, []);
  return (
    <>
    <div className={stylelogin.Authformcontainer}>
      <div className={stylelogin.Authform}>
        <div className={stylelogin.Authformcontent}>
        {/* <div class="alert alert-danger" role="alert">
          {message}
        </div> */}
          <h3 className={stylelogin.Authformtitle}>Sign In</h3>
          <div className={stylelogin.formgroup }>
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={data.username}
              onChange={(event)=>setData({...data,username:event.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={data.password}
              onChange={(event)=>setData({...data,password:event.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={()=>handleClick()}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
         
        </div>
      </div>
    
    </div>
    <ToastContainer />
     </>
  )
}
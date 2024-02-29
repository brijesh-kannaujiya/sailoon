import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Topwithslidebar from "./pages/dashboard/components/Topwithslidebar";
import { useNavigate} from "react-router-dom";
import PageNotfound from './pages/PageNotfound';
import "react-toastify/dist/ReactToastify.css"; 
import Category from './pages/category/Category';
import Campaign from './pages/campaign/Campaign';
function App() {
  const [inactiveTime, setInactiveTime] = useState(0);
  const [logoutMessage, setLogoutMessage] = useState('');

  let lastActiveTime = new Date().getTime();

  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = new Date().getTime();

      if (document.hidden) {
        // Tab becomes inactive
        lastActiveTime = now;
      } else {
        // Tab becomes active
        const inactiveDuration = now - lastActiveTime;
        setInactiveTime((prevInactiveTime) => prevInactiveTime + inactiveDuration);
      }
    };

    const handleFocus = () => {
      const threshold = 600000; // 10 minutes in milliseconds
      //const threshold = 60000; // 1 minutes in milliseconds
      
      if (inactiveTime > threshold) {
         setLogoutMessage('You have been logged out due to inactivity.');
         //alert("logout")
        // Add your logout logic here
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [inactiveTime]);

  

  const navigate = useNavigate();
  const handleClickSS=()=>{
    //navigate("/login");
    window.location.href = '/login';
    setInactiveTime(0)
  }
  if(logoutMessage==="You have been logged out due to inactivity."){
    handleClickSS();
  }else{ 
  return (
    <div className="app">
          <main className="content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path='*' exact={true} element={<PageNotfound />} />
            </Routes>
          </main>
     
        </div>
  );
}
}
export default App;

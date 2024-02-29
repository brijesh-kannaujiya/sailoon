// Category.js
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveCategories, selectAllCategories, getCategoryDataStatus } from '../../redux/categorySlice'; 
import { useNavigate } from "react-router-dom";
import Topwithslidebar from '../dashboard/components/Topwithslidebar';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
// import AddCampaign from '../dashboard/components/AddCampaign';

const Category = () => { 
  const dispatch = useDispatch();
  const categoryData = useSelector(selectAllCategories);
  const categoryStatus = useSelector(getCategoryDataStatus);
  // const error = useSelector(getCategoryDataError);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(retrieveCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleClick = () => {
    navigate("/login");
  }

  if (categoryData.message === "Session expired") {
    handleClick();
  } else {
    return (
      <Box sx={{ mt: 10, ml: 4 }}>
          <Topwithslidebar  />
        {/* Other components */}
        <Stack sx={{ pl: 10, pr: 10, mt: 4 }}>
        <div> 
           <AddCategory/>
         </div>
         <CategoryList />
        </Stack>
        
      </Box>
    );
  }
};

export default Category;

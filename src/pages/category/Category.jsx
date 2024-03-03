// Category.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveCategories,
  selectAllCategories,
  getCategoryDataStatus,
} from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import Topwithslidebar from "../dashboard/components/Topwithslidebar";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import { openstatusss } from "../../redux/AllapplicationStatus";
// import AddCampaign from '../dashboard/components/AddCampaign';

const Category = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector(selectAllCategories);
  const categoryStatus = useSelector(getCategoryDataStatus);
  const openstatus = useSelector(openstatusss);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(retrieveCategories());
    }
  }, [categoryStatus, dispatch]);

  const handleClick = () => {
    navigate("/");
  };

  if (categoryData.message === "Session expired") {
    handleClick();
  } else {
    return (
      <>
        <Topwithslidebar />
        <Box sx={{ mt: 8, ml: openstatus === true ? 30 : 5 }}>
          {/* Other components */}
          <div style={{ marginRight: 50, marginLeft: 50, marginTop: 40 }}>
              <AddCategory />
            <div style={{ marginTop: 100 }}>
              <CategoryList />
            </div>
          </div>
          {/* <Stack sx={{ pl: 2, pr: 2, mt: 2 }}>
        
         <CategoryList />
        </Stack> */}
        </Box>
      </>
    );
  }
};

export default Category;

// categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AllApisDataService from "../services/categoryapis.service";

export const retrieveCategories = createAsyncThunk(
  "categoryapi/CategoryList",
  async () => {
    const res = await AllApisDataService.getAllCategories(); 
    return res.data;
  }
);

export const getCategoryDetails = createAsyncThunk(
  "categoryapi/CategoryDetails",
  async (uuid) => {
    const res = await AllApisDataService.getCategoryDetail(uuid);
    return res.data;
  }
);

// Additional actions for category can be added here

const initialState = {
  categoryData: [],
  categoryDetail: '',
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(retrieveCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryData = action.payload;
      })
      .addCase(retrieveCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(getCategoryDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoryDetails.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.categoryDetail = action.payload;
      })
      .addCase(getCategoryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});  
 
export const selectAllCategories = (state) => state.category.categoryData;
export const getCategoryDataStatus = (state) => state.category.status;
export const getCategoryDataError = (state) => state.category.error;
export const getCategoryDetail = (state) => state.category.categoryDetail;

export default categorySlice.reducer;
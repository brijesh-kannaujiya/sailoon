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

export const getSingleCategoryDetails = createAsyncThunk(
  "categoryapi/CategoryDetails",
  async (uuid) => {
    const res = await AllApisDataService.getCategoryDetail(uuid);
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categoryapi/CategoryDetails",
  async (uuid) => {
    const res = await AllApisDataService.deleteCategoryapi(uuid);
    return res.data;
  }
);

// Additional actions for category can be added here

const initialState = {
  categoryData: [],
  categoryDetail: [],
  catstatus: "idle",
  caterror: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveCategories.pending, (state) => {
        state.catstatus = "loading";
      })
      .addCase(retrieveCategories.fulfilled, (state, action) => {
        state.catstatus = "succeeded";
        state.categoryData = action.payload;
      })
      .addCase(retrieveCategories.rejected, (state, action) => {
        state.catstatus = "failed";
        state.caterror = action.error;
      })
      .addCase(getSingleCategoryDetails.pending, (state) => {
        state.catstatus = "loading";
      })
      .addCase(getSingleCategoryDetails.fulfilled, (state, action) => {
        state.catstatus = "succeeded";
        state.categoryDetail = action.payload;
      })
      .addCase(getSingleCategoryDetails.rejected, (state, action) => {
        state.catstatus = "failed";
        state.caterror = action.error;
      });
  },
});

export const selectAllCategories = (state) => state.category.categoryData;
export const getCategoryDataStatus = (state) => state.category.catstatus;
export const getCategoryDataError = (state) => state.category.caterror;
export const getCategoryDetail = (state) => state.category.categoryDetail;
// export function getCategoryDetails(state) {
//   console.log(state);
//   return state.category.categoryDetail.categories[0];
// }

export default categorySlice.reducer;

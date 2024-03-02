import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AllApisDataService from "../services/winnerapis.service";


export const retrieveUser = createAsyncThunk(
  "userlist/userlist",
  async () => {
    const res = await AllApisDataService.getAllUser();
    return res.data;
  }
);

// export const getDetails = createAsyncThunk(
//   "campaignapi/CampaignDetails",
//   async (id) => {
//     const res = await AllApisDataService.getCampaignapiDetail(id);
//     return res.data;
//   }
// );




const initialState = {
  userData: [],
  status: "idle",
  error: null,
  reserved: [],
  status_deactive: "idle",
  error_deactive: null,
  active_deactive: "",
};

const userlistSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(retrieveUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      // .addCase(getDetails.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getDetails.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   //alert(JSON.stringify(action.payload))
      //   state.campaigndata_detail = action.payload;
      // })
      // .addCase(getDetails.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error;
      // })
      // .addCase(deActiveDeals.pending, (state) => {
      //   state.status_deactive = "loading";
      // })
      // .addCase(deActiveDeals.fulfilled, (state, action) => {
      //   state.status_deactive = "succeeded";
      //   //alert(JSON.stringify(action.payload))
      //   state.active_deactive = action.payload;
      // })
      // .addCase(deActiveDeals.rejected, (state, action) => {
      //   state.status_deactive = "failed";
      //   state.error_deactive = action.error;
      // });
  },
});

export const selectAllData = (state) => state.CampaignLists.userData;
export const getDataStatus = (state) => state.CampaignLists.status;
export const getDataError = (state) => state.CampaignLists.error;

// export const getCampaignDetailAll = (state) =>
//   state.CampaignLists.campaigndata_detail;

// export const getDeactiveStatus = (state) => state.CampaignLists.status_deactive;
// export const getDeactiveError = (state) => state.CampaignLists.active_deactive;
// export const getCampaignDeactiveMsg = (state) =>
//   state.CampaignLists.active_deactive;

// export const { reserveRocket, myReservedRockets } = rocketsSlice.actions;
export default userlistSlice.reducer;

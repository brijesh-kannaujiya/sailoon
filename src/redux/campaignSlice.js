import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AllApisDataService from "../services/winnerapis.service";
// import { json } from "react-router-dom";

// export const createTutorial = createAsyncThunk(
//   "tutorials/create",
//   async ({ title, description }) => {
//     const res = await AllApisDataService.create({ title, description });
//     return res.data;
//   }
// );

export const retrieveCampaign = createAsyncThunk(
  "campaignapi/CampaignList",
  async () => {
    const res = await AllApisDataService.getAll();
    return res.data;
  }
);

export const getDetails = createAsyncThunk(
  "campaignapi/CampaignDetails",
  async (id) => {
    const res = await AllApisDataService.getCampaignapiDetail(id);
    return res.data;
  }
);

export const deActiveDeals = createAsyncThunk(
  "campaignapi/deleteCampaign",
  async (id) => {
    const res = await AllApisDataService.deactiveCampaignapi(id);
    return res.data;
  }
);
// export const updateTutorial = createAsyncThunk(
//   "tutorials/update",
//   async ({ id, data }) => {
//     const res = await AllApisDataService.update(id, data);
//     return res.data;
//   }
// );

// export const deleteTutorial = createAsyncThunk(
//   "tutorials/delete",
//   async ({ id }) => {
//     await AllApisDataService.delete(id);
//     return { id };
//   }
// );

// export const deleteAllTutorials = createAsyncThunk(
//   "tutorials/deleteAll",
//   async () => {
//     const res = await AllApisDataService.deleteAll();
//     return res.data;
//   }
// );

// export const findTutorialsByTitle = createAsyncThunk(
//   "tutorials/findByTitle",
//   async ({ title }) => {
//     const res = await AllApisDataService.findByTitle(title);
//     return res.data;
//   }
// );

const initialState = {
  campaigndata: [],
  campaigndata_detail: "",
  status: "idle",
  error: null,
  reserved: [],
  status_deactive: "idle",
  error_deactive: null,
  active_deactive: "",
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    // reserveRocket: (state, action) => {
    //   const rockets = state.rockets.find(
    //     (results) => results.id === action.payload
    //   );
    //   rockets.reserved = !rockets.reserved;
    // },
    // myReservedRockets: (state) => {
    //   const rockets = state.rockets.filter(
    //     (rocket) => rocket.reserved === true
    //   );
    //   state.reserved = rockets;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveCampaign.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveCampaign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campaigndata = action.payload;
      })
      .addCase(retrieveCampaign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        //alert(JSON.stringify(action.payload))
        state.campaigndata_detail = action.payload;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deActiveDeals.pending, (state) => {
        state.status_deactive = "loading";
      })
      .addCase(deActiveDeals.fulfilled, (state, action) => {
        state.status_deactive = "succeeded";
        //alert(JSON.stringify(action.payload))
        state.active_deactive = action.payload;
      })
      .addCase(deActiveDeals.rejected, (state, action) => {
        state.status_deactive = "failed";
        state.error_deactive = action.error;
      });
  },
});

export const selectAllData = (state) => state.CampaignLists.campaigndata;
export const getDataStatus = (state) => state.CampaignLists.status;
export const getDataError = (state) => state.CampaignLists.error;
export const getCampaignDetailAll = (state) =>
  state.CampaignLists.campaigndata_detail;

export const getDeactiveStatus = (state) => state.CampaignLists.status_deactive;
export const getDeactiveError = (state) => state.CampaignLists.active_deactive;
export const getCampaignDeactiveMsg = (state) =>
  state.CampaignLists.active_deactive;

// export const { reserveRocket, myReservedRockets } = rocketsSlice.actions;
export default campaignSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AllApisDataService from "../services/winnerapis.service";


export const retrieveUser = createAsyncThunk(
  "userlist/userlist",
  async () => {
    const res = await AllApisDataService.getAllUser();
    return res.data;
  }
);

export const userActiveD = createAsyncThunk(
  "userlist/userlist/status",
  async (param) => {
    const res = await AllApisDataService.userAactiveDeactive(param);
    return res.data;
  }
);




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
      .addCase(userActiveD.pending, (state) => {
        state.status_deactive = "loading";
      })
      .addCase(userActiveD.fulfilled, (state, action) => {
        state.status_deactive = "succeeded";
        //alert(JSON.stringify(action.payload))
        state.active_deactive = action.payload;
      })
      .addCase(userActiveD.rejected, (state, action) => {
        state.status_deactive = "failed";
        state.error_deactive = action.error;
      })
      
  },
});

export const selectAllUserData = (state) => state.userlistSlice.userData;
export const getDataStatus = (state) => state.userlistSlice.status;
export const getDataError = (state) => state.userlistSlice.error;

export const selectAllUserActiveS = (state) => state.userlistSlice.active_deactive;
export const getUActiveStatus = (state) => state.userlistSlice.status_deactive;
export const getUActiveError = (state) => state.userlistSlice.error_deactive;

// export const { reserveRocket, myReservedRockets } = rocketsSlice.actions;
export default userlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const applicationstatusSlice = createSlice({
  name: 'Status',
  initialState: {
    openstatus: false,
  },
  reducers: {
    openDrawserS: (state, action) => {
      state.openstatus = action.payload;
    }
  },
 
});

export const openstatusss = (state) => state.allapplicationstatus.openstatus;
 export const { openDrawserS } = applicationstatusSlice.actions;
export default applicationstatusSlice.reducer;
import { configureStore } from '@reduxjs/toolkit'
import campaignSlices from './campaignSlice'
import categorySlice from './categorySlice'
import AllapplicationStatus from './AllapplicationStatus'
import userlistSlice from './userlistSlice'

export const store = configureStore({
  reducer: {
    CampaignLists: campaignSlices,
    category: categorySlice,
    allapplicationstatus:AllapplicationStatus,
    userlistSlice:userlistSlice,
    devTools: true,
  }
})
import { configureStore } from '@reduxjs/toolkit'
import campaignSlices from './campaignSlice'
import categorySlice from './categorySlice'
import AllapplicationStatus from './AllapplicationStatus'

export const store = configureStore({
  reducer: {
    CampaignLists: campaignSlices,
    category: categorySlice,
    allapplicationstatus:AllapplicationStatus,
    devTools: true,
  }
})
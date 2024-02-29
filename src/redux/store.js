import { configureStore } from '@reduxjs/toolkit'
import campaignSlices from './campaignSlice'
import categorySlice from './categorySlice'

export const store = configureStore({
  reducer: {
    CampaignLists: campaignSlices,
    category: categorySlice,
    devTools: true,
  }
})
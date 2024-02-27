import { configureStore } from '@reduxjs/toolkit'
import campaignSlices from './campaignSlice'

export const store = configureStore({
  reducer: {
    CampaignLists: campaignSlices,
    devTools: true,
  }
})
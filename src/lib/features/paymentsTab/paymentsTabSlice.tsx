// reservationsTabSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tab: 0
}

const reservationsTabSlice = createSlice({
  name: 'reservationsTab',
  initialState,
  reducers: {
    setReservationTab(state, action) {
      const { selectedTab } = action.payload

      state.tab = selectedTab
      console.log('state tab' + state.tab)
    }
  }
})

export const reservationsTabActions = reservationsTabSlice.actions
export default reservationsTabSlice.reducer

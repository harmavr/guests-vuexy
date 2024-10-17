// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { Action, ThunkAction } from '@reduxjs/toolkit'

import reservationsTabSlice from './features/reservationsTab/reservationsTabSlice'
import reservationDataSlice from './features/reservationData/reservationDataSlice'
import transactionsSlice from './features/transactions/transactionsSlice'

const rootReducer = combineReducers({
  reservationsTab: reservationsTabSlice,
  reservationData: reservationDataSlice,
  transaction: transactionsSlice
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer // Use rootReducer here for consistency
  })
}

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>

import { createSlice } from '@reduxjs/toolkit'

import type { TransactionList } from '../../types'
import { Transaction } from '../../types'

const initialState: TransactionList = {
  items: [] // Start with an empty array
}

const transactionsSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    saveTransactionData(state, action) {
      const { data } = action.payload

      if (Array.isArray(data)) {
        // Handle array of transactions
        state.items.push(...data)
      } else {
        // Handle a single transaction object
        state.items.push(data)
      }
    }
  }
})

export const transactionAction = transactionsSlice.actions
export default transactionsSlice.reducer

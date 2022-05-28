import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CartState {
  [uid: string]: {
    qty: number
  }
}

const initialState: CartState = {}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      
      if (!state[uid]) {
        state[uid] = { qty: 1 }
      } else {
        state[uid].qty = state[uid].qty + 1;
      }
    },
    decreaseItem: (state: CartState, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      state[uid].qty = state[uid].qty - 1;
    },
    setItemQty: (state: CartState, action: PayloadAction<{ uid: string, qty: number }>) => {
      const { uid, qty } = action.payload;
      state[uid].qty = qty;
    }
  },
})

export const { addItem, decreaseItem, setItemQty } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer
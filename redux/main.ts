import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CartState {
  cart: {
    [uid: string]: {
      qty: number
    }
  }
}

const initialState: CartState = {
  cart: {}
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      
      if (!state.cart[uid]) {
        state.cart[uid] = { qty: 1 }
      } else {
        state.cart[uid].qty = state.cart[uid].qty + 1;
      }
    },
    decreaseItem: (state: CartState, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      state.cart[uid].qty = state.cart[uid].qty - 1;
    },
    setItemQty: (state: CartState, action: PayloadAction<{ uid: string, qty: number }>) => {
      const { uid, qty } = action.payload;
      state.cart[uid].qty = qty;
    }
  },
})

export const { addItem, decreaseItem, setItemQty } = mainSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectCart = (state: RootState) => state.main.cart;

export default mainSlice.reducer
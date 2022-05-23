import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { itemInCart } from '../types'
import type { RootState } from './store'



interface CartState {
  items: {
    [uuid: string]: itemInCart
  }
}

const initialState: CartState = {
  items: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ uuid: string }>) => {
      const { uuid } = action.payload;
      state.items[uuid].inCart = state.items[uuid].inCart + 1;
    },
    decreaseItem: (state, action: PayloadAction<{ uuid: string }>) => {
      const { uuid } = action.payload;
      state.items[uuid].inCart = state.items[uuid].inCart - 1;
    },
    setItemQty: (state, action: PayloadAction<{ uuid: string, qty: number }>) => {
      const { uuid, qty } = action.payload;
      state.items[uuid].inCart = qty;
    }
  },
})

export const { addItem } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer
// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore, Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import cartReducer from '../redux/cart'

type renderParam = {
  preloadedState?: {},
  store?: Store
}

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { cart: cartReducer }, preloadedState }),
    ...renderOptions
  }: renderParam
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
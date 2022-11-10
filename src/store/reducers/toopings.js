import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const toppings = createSlice({
  name: 'toppings',
  initialState,
  reducers: {
    initTopping(_, action) {
      return action.payload
    },
    addTopping(state, action) {
      return [
        ...state.toppings,
        action.payload.data
      ]
    }
  }
})

const { actions, reducer } = toppings
export const { initTopping } = actions
export default reducer
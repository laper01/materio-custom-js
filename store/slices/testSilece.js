
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  value: [
    {name: "test"}
  ]
}

export const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    // aksi yang ditambahkan
    addTest: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    // special reducer untuk hydrating the state
    extraReducers: {
      [HYDRATE] : (state, action) =>{
        return {
          ...state,
          ...action.payload.tests
        }
      }
    }
  }
});

export const {addTest}  = testSlice.actions;
export const selectTest = (state) => state.tests.value;

export default testSlice.reducer;

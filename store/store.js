
import { configureStore, } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./slices/authSlice";
import { testSlice } from "./slices/testSilece"; 

const makeStore = () => configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [testSlice.name]: testSlice.reducer,
  },
  devTools: true
});

export const wrapper = createWrapper(makeStore);
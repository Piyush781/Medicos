import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alertslice";
import { userSlice } from "./userslice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user:userSlice.reducer
  },
});
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // ✅ missing import
import membersReducer from "./slices/membersSlice";
import plansReducer from "./slices/plansSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    members : membersReducer,
    plans : plansReducer
  },
});
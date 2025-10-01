import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uploadReducer from "./features/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

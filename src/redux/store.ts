import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uploadReducer from "./features/uploadSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

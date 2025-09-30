import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// Async thunk — generate OTP
export const generateOtp = createAsyncThunk(
  "auth/generateOtp",
  async (mobile_number: string) => {
    const res = await api.post("/generateOTP", { mobile_number });
    return res.data;
  }
);

// Async thunk — validate OTP
export const validateOtp = createAsyncThunk(
  "auth/validateOtp",
  async ({ mobile_number, otp }: { mobile_number: string; otp: string }) => {
    const res = await api.post("/validateOTP", { mobile_number, otp });
    const token = res.data.token || res.data?.data?.token;
    if (!token) throw new Error("Token not found in response");
    localStorage.setItem("dms_token", token);
    api.defaults.headers.common["token"] = token;
    return token;
  }
);

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("dms_token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("dms_token");
      delete api.defaults.headers.common["token"];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(generateOtp.fulfilled, (state) => { state.loading = false; })
      .addCase(generateOtp.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "OTP send failed"; })
      .addCase(validateOtp.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(validateOtp.fulfilled, (state, action) => { state.loading = false; state.token = action.payload; })
      .addCase(validateOtp.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "OTP validate failed"; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

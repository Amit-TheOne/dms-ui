import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

interface UploadPayload {
  formData: FormData;
}

export const uploadDocument = createAsyncThunk(
  "upload/uploadDocument",
  async ({ formData }: UploadPayload) => {
    const res = await api.post("/saveDocumentEntry", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

interface UploadState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  success: false,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    reset(state) {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Upload failed";
      });
  },
});

export const { reset } = uploadSlice.actions;
export default uploadSlice.reducer;

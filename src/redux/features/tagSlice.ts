import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (term: string) => {
    const res = await api.post("/documentTags", { term });
    return res.data; // backend return an array of tag objects
  }
);

interface TagSuggestion {
  id: string;
  label: string;
}

interface TagsState {
  suggestions: TagSuggestion[];
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  suggestions: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        // If payload has a data property; else use payload directly
        if (action.payload && Array.isArray(action.payload.data)) {
          state.suggestions = action.payload.data;
        } 
        else {
          state.suggestions = action.payload;
        }
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tags";
      });
  },
});

export const { clearSuggestions } = tagSlice.actions;
export default tagSlice.reducer;

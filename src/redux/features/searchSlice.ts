import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

interface SearchParams {
  major_head?: string;
  minor_head?: string;
  from_date?: string;
  to_date?: string;
  tags?: string[];
  searchKeyword?: string;
}

export const searchDocuments = createAsyncThunk(
  "search/searchDocuments",
  async (params: SearchParams) => {
    const body = {
      major_head: params.major_head || "",
      minor_head: params.minor_head || "",
      from_date: params.from_date || "",
      to_date: params.to_date || "",
      tags: params.tags ? params.tags.map((t) => ({ tag_name: t })) : [],
      uploaded_by: "",
      start: 0,
      length: 25,
      filterId: "",
      search: { value: params.searchKeyword || "" },
    };

    const res = await api.post("/searchDocumentEntry", body);
    return res.data;
  }
);

interface SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload?.data || action.payload; // adapt to response
      })
      .addCase(searchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Search failed";
      });
  },
});

export default searchSlice.reducer;

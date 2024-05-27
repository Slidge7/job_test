import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalService from "./globalService";

const initialState = {
  sessionInfo: {},
  volumetrie: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get session info
export const getSessionInfo = createAsyncThunk(
  "global/sessionInfo",
  async (_, thunkAPI) => {
    try {
      return await globalService.getSessions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get volumetrie
export const getVolumetrie = createAsyncThunk(
  "global/volumetrie",
  async (_, thunkAPI) => {
    try {
      return await globalService.getVolumetrie();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionInfo.pending, (state) => {
        state.isLoading = true;
        console.log('loading')
      })
      .addCase(getSessionInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log('action', action.payload)
        state.sessionInfo = action.payload;
      })
      .addCase(getSessionInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log('action', action.payload)
        state.message = action.payload;
      })
      .addCase(getVolumetrie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVolumetrie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.volumetrie = action.payload;
      })
      .addCase(getVolumetrie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      ;
  },
});

export const { reset } = globalSlice.actions;
export default globalSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contactsList: {},
  searchQuery:'',
  searchResult:{},
  contact:{},
  page:1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get contacts list
export const getcontacts = createAsyncThunk(
  "contacts/getList",
  async (_, thunkAPI) => {
    try {
      return await contactService.getContacts();
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

// search contacts 
export const searchContacts = createAsyncThunk(
  "contacts/search",
  async (query, thunkAPI) => {
    
    try {
      return await contactService.searchContacts(query);
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

// get contact by id 
export const getContactById = createAsyncThunk(
  "contacts/contactById",
  async (contactId, thunkAPI) => {
    try {
      return await contactService.getContactById(contactId);
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


export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getcontacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcontacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contactsList = action.payload.data;
      })
      .addCase(getcontacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchContacts.pending, (state) => {
        state.isLoading = true;
        console.log('loading')
      })
      .addCase(searchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchResult = action.payload;
        console.log('SERRRsuccess',action.payload)
      })
      .addCase(searchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log('err',action.payload)
      })
      .addCase(getContactById.pending, (state) => {
        state.isLoading = true;
        state.contact = {};
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      ;
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;

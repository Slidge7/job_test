import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import contactReducer from "./contacts/contactSlice";



const store = configureStore({
  reducer: {
    contact: contactReducer,
    global: globalReducer,
  },
});

export default store;

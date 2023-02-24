import { configureStore } from "@reduxjs/toolkit";
import compSlice from "./composeSlice";
import emailDetailsSlice from "./emailDetailSlice";
import filterSlice from "./filteredslice";
import mailSlice from "./mailSlice";
import sentSlice from "./sentMailSlice";
import sideBarSlice from "./sideBarSlice";

const store = configureStore({
  reducer: {
    sidebarReducer: sideBarSlice.reducer,
    composeReducer: compSlice.reducer,
    mailReducer: mailSlice.reducer,
    emailDetailReducer: emailDetailsSlice.reducer,
    sentReducer: sentSlice.reducer,
    filterReducer: filterSlice.reducer,
  },
});

export default store;

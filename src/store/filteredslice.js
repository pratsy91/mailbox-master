import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filtered",
  initialState: { mails: [] },
  reducers: {
    setMails(state, action) {
      const data = action.payload;
      state.mails = data.mails;
    },
  },
});

export const filterSliceActions = filterSlice.actions;

export default filterSlice;

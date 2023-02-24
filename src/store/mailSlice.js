import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mails",
  initialState: { mails: [] },
  reducers: {
    setMails(state, action) {
      const data = action.payload;
      state.mails = data.mails;
    },
  },
});

export const mailSliceActions = mailSlice.actions;

export default mailSlice;

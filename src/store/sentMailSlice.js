import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
  name: "sent",
  initialState: { sentMails: [] },
  reducers: {
    setMails(state, action) {
      const data = action.payload;
      state.sentMails = data.mails;
    },
  },
});

export const sentSliceActions = sentSlice.actions;

export default sentSlice;

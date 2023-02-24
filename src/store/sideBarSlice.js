import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: { show: false },
  reducers: {
    handleClose(state) {
      state.show = false;
    },
    handleShow(state) {
      state.show = true;
    },
  },
});

export const sidebarActions = sideBarSlice.actions;

export default sideBarSlice;

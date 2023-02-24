import { createSlice } from "@reduxjs/toolkit";

const compSlice = createSlice({
  name: "compose",
  initialState: { show: false },
  reducers: {
    showModal(state, action) {
      const data = action.payload;
      state.show = data.flag;
    },
    closeModal(state) {
      state.show = false;
    },
  },
});

export const compSliceActions = compSlice.actions;

export default compSlice;

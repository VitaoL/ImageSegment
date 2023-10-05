import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "size",
  initialState: {
    value: 15,
  },
  reducers: {
    changeSize(state, { payload }) {
      return { ...state, value: payload };
    },
  },
});

export const { changeSize } = slice.actions;

export const selectorSize = (state) => state.size;

export default slice.reducer;
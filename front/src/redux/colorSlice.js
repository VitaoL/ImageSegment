import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "color",
  initialState: {
    name: "#000000",
  },
  reducers: {
    changeColor(state, { payload }) {
      return { ...state, name: payload };
    },
  },
});

export const { changeColor } = slice.actions;

export const selectColor = (state) => state.color;

export default slice.reducer;

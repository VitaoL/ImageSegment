import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "imgContext",
  initialState: {
    contextImg: null,
  },
  reducers: {
    changeImgContext(state, { payload }) {
      return { ...state, contextImg: payload };
    },
  },
});

export const { changeImgContext } = slice.actions;

export const selectImgContext = (state) => state.imgContext;

export default slice.reducer;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import colorReducer from "./colorSlice";
import imgContextReducer from "./imgContextSlice";
import sizeReducer from "./sizeSlider";
export default configureStore({
  reducer: {
    imgContext: imgContextReducer,
    color: colorReducer,
    size: sizeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

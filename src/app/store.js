import { configureStore } from '@reduxjs/toolkit';
import productSlice from "../features/sliceProducts";


export const store = configureStore({
  reducer: {
    product : productSlice
  }
});

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProductInfoThunk,
  fetchProductsByNameThunk,
  fetchProductsByCategoryThunk,
  fetchProductsThunk,
} from "../../services/thunks.services";

export type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  img: string;
};

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  productInfo: Product;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  productInfo: {
    _id: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    img: "",
  },
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetFilteredItems: (state) => {
      state.filteredItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductInfoThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductInfoThunk.fulfilled, (state, action) => {
      state.productInfo = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductsByNameThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsByNameThunk.fulfilled, (state, action) => {
      state.filteredItems = action.payload.data;
      state.isLoading = false;
    });

    builder.addCase(fetchProductsByCategoryThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchProductsByCategoryThunk.fulfilled, (state, action) => {
      state.filteredItems = action.payload.data;
      state.isLoading = false;
    });
  },
});
export const { resetFilteredItems } = productsSlice.actions;

export default productsSlice.reducer;

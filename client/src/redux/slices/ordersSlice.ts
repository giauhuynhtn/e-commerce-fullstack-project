import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersThunk } from "services/thunks.services";

export type Order = {
  orderDate: Date;
  deliveryDate: Date;
  returnDate: Date;
  products: string[];
  userId: string;
  status: string;
};

export interface OrderState {
  items: Order[];
  isLoading: boolean;
}

const initialState: OrderState = {
  items: [],
  isLoading: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchOrdersThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
  },
});

export default ordersSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface CartState {
  items: CartItem[];
  isOpening: boolean;
}

const initialState: CartState = {
  items: [],
  isOpening: false,
};

export const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const newCartList = state.items.filter(
        (item) => item.product._id !== action.payload.product._id
      );
      state.items = newCartList;
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const updateItem = action.payload;
      const updatedCartList = state.items.map((item) => {
        if (item.product._id === updateItem.product._id) {
          const newQuantity = updateItem.quantity;
          return {
            product: updateItem.product,
            quantity: newQuantity,
          };
        }
        return item;
      });

      state.items = updatedCartList;
    },
    resetCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpening = true;
    },
    closeCart: (state) => {
      state.isOpening = false;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  updateCartItem,
  openCart,
  closeCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

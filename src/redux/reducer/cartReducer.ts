import type { CartInitialState } from "@/types/reducer";
import type { CartItems, ShippingInfo } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CartInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  total: 0,
  shippingCharges: 0,
  tax: 0,
  discount: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pincode: 0,
    state: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItems>) => {
      state.loading = true;
      const existIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (existIndex !== -1) {
        state.cartItems[existIndex] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (items) => items.productId !== action.payload.id
      );
    },
    updateCartDetails: (state) => {
      const subtotal = state.cartItems.reduce(
        (prev, curr) => curr.price * curr.quantity + prev,
        0
      );
      state.subtotal = subtotal;
      state.shippingCharges = subtotal > 1500 ? 39 : 199;
      state.tax = subtotal * 0.08;
      state.total =
        state.tax + state.subtotal + state.shippingCharges - state.discount;
    },
    reduceDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    updateShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    clearCart:()=> initialState
  },
});

export const {
  addToCart,
  removeCartItem,
  updateCartDetails,
  reduceDiscount,
  updateShippingInfo,
  clearCart
} = cartReducer.actions;

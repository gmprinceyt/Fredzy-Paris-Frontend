import type { CartItems } from "@/types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const addToCartHandler = (cartItems: CartItems, dispatch:Dispatch<UnknownAction>) => {
  if (cartItems.stock < 1) {
    toast.error("Product Out Of Stock");
    return;
  }

  dispatch(addToCart(cartItems));
  toast.success("Product Added");
};

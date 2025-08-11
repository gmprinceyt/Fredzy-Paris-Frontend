import type { CartItems, ShippingInfo, User } from "./types";


export interface UserReducerInitailState  {
    user: User | null ;
    loading: boolean;
};

export interface CartInitialState {
    loading: boolean;
    cartItems: CartItems[];
    subtotal: number;
    total:number;
    shippingCharges: number;
    tax:number;
    discount:number;
    shippingInfo: ShippingInfo;
}
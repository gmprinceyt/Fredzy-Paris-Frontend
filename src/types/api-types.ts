import type { CartItems, Product, ShippingInfo, User } from "./types";

export interface MessageResponse {
  statusCode: number;
  message: string;
  data: object;
  success: boolean;
}
export interface UserResponse extends MessageResponse {
  data: User;
}
export interface ProductResponse extends MessageResponse {
  data: Product[];
}
export interface SingleProductResponse extends MessageResponse {
  data: Product;
}
export interface CategoryResponse extends MessageResponse {
  data: string[];
}
export interface SearchProductResponse {
  success: boolean;
  products: Product[];
  pageLength: number;
}
export type SearchProductRequest = {
  search?: string;
  category?: string;
  price?: number;
  sort?: string;
  page?: number;
};

export type CreateOrderRequestQuery = {
  orderItems: CartItems[];
  discount: number;
  shippingCharges: number;
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  total: number;
  user: number;
};

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
  user: string;
};

export type CreatePaymentOrderResponse = {
  statusCode: number;
  message: string;
  data: {
    amount: number;
    amount_due: number;
    amount_paid: number;
    attempts: number;
    created_at: number;
    currency: "INR";
    entity: string;
    id: string;
    notes: [];
    offer_id: null | string;
    receipt: string;
    status: string;
  };
  success: boolean;
};

export interface UserOrderResponse extends MessageResponse {
  data:(CreateOrderRequestQuery & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    status:"Processing"| "Shipped"|  "Delivered" | "OutOfDelivery";
  })[];
}



import type {
  CreatePaymentOrderResponse,
  GetDiscountResponse,
} from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
  }),
  endpoints: (builder) => ({
    paymentOrder: builder.mutation<
      CreatePaymentOrderResponse,
      { amount: number }
    >({
      query: (body) => ({
        url: "order",
        method: "POST",
        body: body,
      }),
    }),
    paymentVerify: builder.mutation<
      { message: string },
      {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }
    >({
      query: (body) => ({
        url: "verify",
        method: "POST",
        body: body,
      }),
    }),
    getDiscount: builder.query<GetDiscountResponse, string>({
      query: (id) => `coupon/discount?code=${id}`,
    }),
  }),
});

export const {
  usePaymentOrderMutation,
  usePaymentVerifyMutation,
  useGetDiscountQuery,
} = paymentApi;

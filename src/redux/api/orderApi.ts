import type {
  CreateOrderRequestQuery,
  MessageResponse,
  UserOrderResponse,
} from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<MessageResponse, CreateOrderRequestQuery>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
        providesTags: ['order']
      }),
    }),
    MyOrder: builder.query<UserOrderResponse, string>({
      query: (id) => `user/all?id=${id}`,
      providesTags: ['order']
    }),
  }),
});

export const { useCreateOrderMutation,useMyOrderQuery } = orderApi;

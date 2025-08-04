import type { ProductResponse } from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse, string>({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductQuery } = productApi;

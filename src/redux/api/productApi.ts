import type {
  CategoryResponse,
  ProductResponse,
  SearchProductRequest,
  SearchProductResponse,
  SingleProductResponse,
} from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProduct: builder.query<ProductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allCategories: builder.query<CategoryResponse, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),
    productDetails: builder.query<SingleProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    searchProduct: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ search, sort, price, page, category }) => {
        let base = `search?search=${search}&page=${page}`;
        if (sort) base += `&sort=${sort}`;
        if (price) base += `&price=${price}`;
        if (category === "all") {
          base += `&category=`;
        } else {
          base += `&category=${category}`;
        }
        return base;
      },
      providesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllCategoriesQuery,
  useProductDetailsQuery,
  useSearchProductQuery,
} = productApi;

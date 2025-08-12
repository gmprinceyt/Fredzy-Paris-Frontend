import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {MessageResponse,  UserResponse } from "@/types/api-types";
import type { User } from "@/types/types";
import axios from "axios";
import toast from "react-hot-toast";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data.data;
  } catch (error) {
    if (error?.message === 'Network Error') return toast.error("Kindly Connect your Internet")
    toast.error("User Can'nt Find!")
  }
};

export const { useLoginMutation } = userApi;

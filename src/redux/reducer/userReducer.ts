import type { User } from "@/types/types";
import type { UserReducerInitailState } from "@/types/reducer";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserReducerInitailState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const {userExist, userNotExist} = userReducer.actions

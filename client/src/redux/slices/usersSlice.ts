import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "services/thunks.services";

export type User = {
  _id: string;
  firstname: string;
  isBanned: boolean;
  permission: string;
  isAdmin: boolean;
  orders: string[];
  lastname?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type CurrentUser = {
  userId: string;
  firstname: string;
  permission: string;
  banStatus: string;
  isAdmin: string;
  orders: string[];
  iat: number;
  exp: number;
};
export interface UsersState {
  items: User[];
  currentUser: CurrentUser;
  isLoading: boolean;
}

const initialState: UsersState = {
  items: [],
  currentUser: {
    userId: "",
    firstname: "",
    permission: "",
    banStatus: "",
    isAdmin: "",
    orders: [],
    iat: 0,
    exp: 0,
  },
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.isLoading = false;
    });
  },
});
export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;

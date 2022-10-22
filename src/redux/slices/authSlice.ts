import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

export interface AuthState {
  auth: Auth;
}

const initialState: AuthState = {
  auth: {
    id: null,
    email: null,
    login: null,
    isAuth: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Auth>) => {
      state.auth = { ...action.payload };
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;

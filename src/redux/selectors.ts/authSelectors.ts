import { State } from "../reduxStore";

export const getIsAuth = (state: State) => state.auth.auth.isAuth;

export const getAuth = (state: State) => state.auth.auth;
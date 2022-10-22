import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { authAPI } from "./API/auth";
import { profileAPI } from "./API/profile";
import { usersAPI } from "./API/users";
import authReducer from "./slices/authSlice";
import dialogsReducer from "./slices/dialogsSlice";
import profileSlice from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dialogs: dialogsReducer,
    profile: profileSlice,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersAPI.middleware)
      .concat(authAPI.middleware)
      .concat(profileAPI.middleware)
});

setupListeners(store.dispatch);

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

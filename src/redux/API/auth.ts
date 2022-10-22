import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  requestLoginData,
  ResponseDataBase,
  ResponseLogin,
  ResponseMe,
} from "../../pages/Login/types";
import { setAuthState } from "../slices/authSlice";
import {
  BASE_INSTANCE,
  ENDPOINTS,
  REQUEST_METHOD,
  TAG_TITLE,
} from "./constants";

export const authAPI = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery(BASE_INSTANCE),
  tagTypes: [TAG_TITLE.AUTH],
  endpoints: (build) => ({
    auth: build.query<ResponseDataBase<ResponseMe>, void>({
      query: () => ({
        url: ENDPOINTS.AUTH,
      }),
      providesTags: [TAG_TITLE.AUTH],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.resultCode === 0)
            dispatch(setAuthState({ ...data?.data, isAuth: true }));
        } catch (err) {
          console.warn(err);
        }
      },
    }),
    getCaptchaUrl: build.query<string, void>({
      query: () => ({
        url: ENDPOINTS.GET_CAPTCHA,
      }),
      transformResponse: (response: {url: string}) => response.url,
    }),
    login: build.mutation<ResponseDataBase<ResponseLogin>, requestLoginData>({
      query: (requestData) => ({
        url: ENDPOINTS.LOGIN,
        method: REQUEST_METHOD.POST,
        body: requestData,
      }),
      invalidatesTags: (result, error, arg) => {
        return error || result?.resultCode === 1 || result?.resultCode === 10
          ? []
          : [TAG_TITLE.AUTH];
      },
    }),
    logout: build.mutation<ResponseDataBase<{}>, void>({
      query: () => ({
        url: ENDPOINTS.LOGIN,
        method: REQUEST_METHOD.DELETE,
      }),
      invalidatesTags: (result, error, arg) => (error ? [] : [TAG_TITLE.AUTH]),
    }),
  }),
});

export const {
  useAuthQuery,
  useGetCaptchaUrlQuery,
  useLoginMutation,
  useLogoutMutation,
} = authAPI;

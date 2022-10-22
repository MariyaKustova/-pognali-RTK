import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseDataBase } from "../../pages/Login/types";
import { ProfileFormValues, UserProfile } from "../../pages/Profile/types";
import {
  BASE_INSTANCE,
  ENDPOINTS,
  REQUEST_METHOD,
  TAG_TITLE,
} from "./constants";

export const profileAPI = createApi({
  reducerPath: "profile/api",
  baseQuery: fetchBaseQuery(BASE_INSTANCE),
  tagTypes: [TAG_TITLE.PROFILE, TAG_TITLE.PROFILE_STATUS],
  endpoints: (build) => ({
    getProfile: build.query<UserProfile, number>({
      query: (userId) => ({
        url: `${ENDPOINTS.PROFILE}/${userId}`,
      }),
      providesTags: [TAG_TITLE.PROFILE],
    }),
    getStatus: build.query<string, number>({
      query: (userId) => ({
        url: `${ENDPOINTS.STATUS_PROFILE}/${userId}`,
      }),
      providesTags: [TAG_TITLE.PROFILE_STATUS],
    }),
    updateStatus: build.mutation<ResponseDataBase<{}>, string>({
      query: (status) => ({
        url: `${ENDPOINTS.STATUS_PROFILE}`,
        method: REQUEST_METHOD.PUT,
        body: { status },
      }),
      invalidatesTags: [TAG_TITLE.PROFILE_STATUS],
    }),
    savePhoto: build.mutation<ResponseDataBase<{}>, File>({
      query: (photo) => {
        const formData = new FormData();
        formData.append("image", photo);

        return {
          url: ENDPOINTS.SAVE_PHOTO_PROFILE,
          method: REQUEST_METHOD.PUT,
          body: formData,
        };
      },
      invalidatesTags: [TAG_TITLE.PROFILE],
    }),
    saveProfile: build.mutation<ResponseDataBase<{}>, ProfileFormValues>({
      query: (profile) => ({
        url: ENDPOINTS.PROFILE,
        method: REQUEST_METHOD.PUT,
        body: profile,
      }),
      invalidatesTags: [TAG_TITLE.PROFILE],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetStatusQuery,
  useUpdateStatusMutation,
  useSavePhotoMutation,
  useSaveProfileMutation,
} = profileAPI;

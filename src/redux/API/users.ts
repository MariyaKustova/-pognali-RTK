import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseDataBase } from "../../pages/Login/types";
import { User, UserResp, UsersResponse } from "../../pages/Users/types";
import { BASE_INSTANCE, ENDPOINTS, REQUEST_METHOD, TAG_TITLE } from "./constants";

export const usersAPI = createApi({
  reducerPath: "users/api",
  baseQuery: fetchBaseQuery(BASE_INSTANCE),
  tagTypes: [TAG_TITLE.USERS],
  endpoints: (build) => {
    return {
      getUsers: build.query<
        UserResp,
        { currentPage: number; pageSize: number }
      >({
        query: ({ currentPage, pageSize }) => ({
          url: ENDPOINTS.GET_USERS,
          params: {
            page: currentPage,
            count: pageSize,
          },
        }),
        transformResponse: (response: UsersResponse) => ({
          items: response.items,
          totalCount: response.totalCount,
        }),
        providesTags: [TAG_TITLE.USERS]
      }),
      getFriends: build.query<User[], void>({
        query: () => ({
          url: ENDPOINTS.GET_USERS,
          params: {
            page: 1,
            count: 10,
          },
        }),
        transformResponse: (response: UsersResponse, meta, arg) =>
          response.items
            .filter((friend: User) => !Boolean(friend.followed))
            .splice(0, 3),        
      }),
      follow: build.mutation<ResponseDataBase<{}>, number>({
        query: (id) => ({
          url: `${ENDPOINTS.FOLLOW}/${id}`,
          method: REQUEST_METHOD.POST,
        }),
        transformResponse: (
          response: { data: ResponseDataBase<{}> },
          meta,
          arg
        ) => response.data,
        invalidatesTags: [TAG_TITLE.USERS],
      }),
      unfollow: build.mutation<ResponseDataBase<{}>, number>({
        query: (id) => ({
          url: `${ENDPOINTS.FOLLOW}/${id}`,
          method: REQUEST_METHOD.DELETE,
        }),
        transformResponse: (
          response: { data: ResponseDataBase<{}> },
          meta,
          arg
        ) => response.data,
        invalidatesTags: [TAG_TITLE.USERS],
      }),
    };
  },
});

export const {
  useGetUsersQuery,
  useGetFriendsQuery,
  useFollowMutation,
  useUnfollowMutation,
} = usersAPI;

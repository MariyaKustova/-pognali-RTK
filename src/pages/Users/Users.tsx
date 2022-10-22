import React, { useCallback, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { User } from "./types";
import Loader from "../../components/common/Loader/Loader";
import UserItem from "./UserItem";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";
import {
  useFollowMutation,
  useGetUsersQuery,
  useUnfollowMutation,
} from "../../redux/API/users";

import s from "./UserItem.module.scss";

const PAGE_SIZE = 5;

const styles = {
  color: "#192144",
  ".MuiButtonBase-root": {
    backgroundColor: "#ffd74b",
  },
  ".MuiPaginationItem-ellipsis": {
    color: "#ffd74b",
  },
  ".MuiButtonBase-root.Mui-selected": {
    backgroundColor: "#ff8d30",
    color: "#192144",
  },
  ".MuiButtonBase-root.Mui-selected.MuiButtonBase-root:hover": {
    backgroundColor: "#ffbd30",
  },
  ".MuiButtonBase-root:hover": {
    backgroundColor: "#ffbd30",
  },
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { items, totalCount, isFetching, isLoading, usersError } =
    useGetUsersQuery(
      {
        currentPage,
        pageSize: PAGE_SIZE,
      },
      {
        selectFromResult: ({ data, isLoading, isFetching, error }) => ({
          items: data?.items,
          totalCount: data?.totalCount,
          isFetching,
          isLoading,
          usersError: error,
        }),
      }
    );

  const [follow, { error: followError }] = useFollowMutation();

  const [unfollow, { error: unfollowError }] = useUnfollowMutation();

  const changeCurrentPage = useCallback(
    (e: React.ChangeEvent<unknown>, newPage: number) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | string | undefined
  >(usersError || followError || unfollowError);

  useEffect(() => {
    if (usersError || followError || unfollowError) {
      setError(usersError || followError || unfollowError);
    }
  }, [usersError, followError, unfollowError]);

  return (
    <>
      {isFetching || isLoading ? (
        <Loader />
      ) : (
        <>
          {error && (
            <ErrorAlert
              error={usersError || followError || unfollowError}
              resetError={() => setError(undefined)}
            />
          )}
          <div className={s.UserItem__WrapperPagination}>
            <Pagination
              count={totalCount}
              color="secondary"
              size="medium"
              showFirstButton
              onChange={changeCurrentPage}
              defaultPage={currentPage}
              sx={styles}
            />
          </div>
          {items?.length ? (
            items.map((user: User) => (
              <UserItem
                key={user.id}
                {...user}
                follow={follow}
                unfollow={unfollow}
              />
            ))
          ) : (
            <div className={s.UserItem__MessageWrapper}>
              <div className={s.UserItem__Message}>
                Unfortunately, no users have been found!
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;

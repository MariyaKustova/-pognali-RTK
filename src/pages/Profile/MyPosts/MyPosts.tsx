import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostItem from "./components/PostItem/PostItem";
import PostForm from "./components/PostForm/PostForm";
import { Post } from "../types";
import { State } from "../../../redux/reduxStore";
import { setNewPost } from "../../../redux/slices/profileSlice";
import { getPostsData } from "../../../redux/selectors.ts/profileSlectors";

import s from "./MyPosts.module.scss";

const MyPosts = () => {
  const posts = useSelector((state: State) => getPostsData(state));
  const dispatch = useDispatch();
  const onSubmit = useCallback((values: { newPost: string }) => {
    values.newPost.length && dispatch(setNewPost(values.newPost));
  }, [dispatch]);

  return (
    <Fragment>
      <PostForm onSubmit={onSubmit} />
      <ul className={s.MyPosts}>
        {posts.map((post: Post, index: number) => (
          <PostItem
            key={index}
            message={post.message}
            countLikes={post.countLikes}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default MyPosts;

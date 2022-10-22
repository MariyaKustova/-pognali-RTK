import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../pages/Profile/types";

export interface ProfileState {
  postsData: Post[];
}

const initialState: ProfileState = {
  postsData: [
    {
      id: "1",
      message: "Hi, how are you?",
      countLikes: 12,
    },
    {
      id: "2",
      message: "It is second post!",
      countLikes: 18,
    },
    {
      id: "3",
      message: "Hi, how are you?",
      countLikes: 2,
    },
    {
      id: "4",
      message: "It is second post!",
      countLikes: 19,
    },
    {
      id: "5",
      message: "Hi, how are you?",
      countLikes: 34,
    },
    {
      id: "6",
      message: "It is second post!",
      countLikes: 45,
    },
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setNewPost: (state, action: PayloadAction<string>) => {
      const newPost: Post = {
        id: "7",
        message: action.payload,
        countLikes: 17,
      };
      state.postsData.push(newPost);
    },
  },
});

export const { setNewPost } = profileSlice.actions;

export default profileSlice.reducer;

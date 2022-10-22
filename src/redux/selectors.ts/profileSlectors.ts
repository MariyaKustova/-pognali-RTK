import { State } from "../reduxStore";

export const getPostsData = (state: State) => state.profile.postsData;

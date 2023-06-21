import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PostState } from './post.reducer';

export const selectPostReducer = (state: RootState): PostState => state.post;

export const selectPostItems = createSelector(
    [selectPostReducer],
    (post) => post.posts
);

export const selectPostId = createSelector(
    [selectPostReducer],
    (post) => post.postId
);

export const selectSinglePost = createSelector(
    [selectPostReducer],
    (post) => post.singlePost
);

export const selectUserPosts = createSelector(
    [selectPostReducer],
    (post) => post.userPosts
);

export const selectAllPosts = createSelector(
    [selectPostReducer],
    (post) => post.posts
);
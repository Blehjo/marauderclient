import { createSelector } from 'reselect';

import { RootState } from '../store';
import { CommunityPostState } from './communitypost.reducer';

export const selectCommunityPostReducer = (state: RootState): CommunityPostState => state.communityPost;

export const selectCommunityPostItems = createSelector(
    [selectCommunityPostReducer],
    (communityPost) => communityPost.posts
);

export const selectCommunityPostId = createSelector(
    [selectCommunityPostReducer],
    (communityPost) => communityPost.postId
);

export const selectSinglePost = createSelector(
    [selectCommunityPostReducer],
    (communityPost) => communityPost.singlePost
);

export const selectUserPosts = createSelector(
    [selectCommunityPostReducer],
    (communityPost) => communityPost.userPosts
);

export const selectAllPosts = createSelector(
    [selectCommunityPostReducer],
    (communityPost) => communityPost.posts
);
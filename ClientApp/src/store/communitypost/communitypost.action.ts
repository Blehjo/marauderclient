import { COMMUNITY_POST_ACTION_TYPES, CommunityPost } from './communitypost.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type CommunityPostCreateStart = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.CREATE_START, { postValue: string, mediaLink: string, imageFile: File }
>;

export type CommunityPostCreateSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.CREATE_SUCCESS, 
    CommunityPost[]
>;

export type CommunityPostCreateFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommunityPostUpdateStart = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.UPDATE_START,
    { postId: number, postValue: string, mediaLink: string, imageFile: File }
>;

export type CommunityPostUpdateSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.UPDATE_SUCCESS, 
    CommunityPost
>;

export type CommunityPostUpdateFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommunityPostDeleteStart = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.DELETE_START,
    { postId: number }
>;

export type CommunityPostDeleteSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.DELETE_SUCCESS, 
    CommunityPost[]
>;

export type CommunityPostDeleteteFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type CommunityPostFetchSingleStart = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_START,
    { postId: number }
>;

export type CommunityPostFetchSingleSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    CommunityPost
>;

export type CommunityPostFetchSingleFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type CommunityPostFetchUserPostsStart = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_START,
    { userId: string | undefined}
>;

export type CommunityPostFetchUserPostsSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_SUCCESS, 
    CommunityPost[]
>;

export type CommunityPostFetchUserPostsFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_FAILED,
    Error
>;

export type CommunityPostFetchAllStart = Action<
    COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_START
>;

export type CommunityPostFetchAllSuccess = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    CommunityPost[]
>;

export type CommunityPostFetchAllFailed = ActionWithPayload<
    COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const communityPostCreateStart = withMatcher(
    (postValue: string, mediaLink: string, imageFile: File): CommunityPostCreateStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.CREATE_START, { postValue, mediaLink, imageFile })
);

export const communityPostCreateSuccess = withMatcher(
    (posts: CommunityPost[]): CommunityPostCreateSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.CREATE_SUCCESS, posts)
);

export const communityPostCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_POST_ACTION_TYPES.CREATE_FAILED, error)
);
 
export const communityPostUpdateStart = withMatcher(
    (postId: number, postValue: string, mediaLink: string, imageFile: File): CommunityPostUpdateStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.UPDATE_START, { postId, postValue, mediaLink, imageFile })
);

export const communityPostUpdateSuccess = withMatcher(
    (post: CommunityPost): CommunityPostUpdateSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.UPDATE_SUCCESS, post)
);

export const communityPostUpdateFailed = withMatcher(
    (error: Error): CommunityPostUpdateFailed => 
    createAction(COMMUNITY_POST_ACTION_TYPES.UPDATE_FAILED, error)
);

export const communityPostDeleteStart = withMatcher(
    (postId: number): CommunityPostDeleteStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.DELETE_START, { postId })
);

export const communityPostDeleteSuccess = withMatcher(
    (post: CommunityPost[]): CommunityPostDeleteSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.DELETE_SUCCESS, post)
);

export const communityPostDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_POST_ACTION_TYPES.DELETE_START, error)
);

export const communityPostFetchSingleStart = withMatcher(
    (postId: number): CommunityPostFetchSingleStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_START, { postId })
);

export const communityPostFetchSingleSuccess = withMatcher(
    (post: CommunityPost): CommunityPostFetchSingleSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_SUCCESS, post)
);

export const communityPostFetchSingleFailed = withMatcher(
    (error: Error): CommunityPostFetchSingleFailed => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const communityPostFetchUserPostsStart = withMatcher(
    (userId: string | undefined): CommunityPostFetchUserPostsStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_START, { userId })
);

export const communityPostFetchUserPostsSuccess = withMatcher(
    (post: CommunityPost[]): CommunityPostFetchUserPostsSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_SUCCESS, post)
);

export const communityPostFetchUserPostsFailed = withMatcher(
    (error: Error): CommunityPostFetchUserPostsFailed => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_FAILED, error)
);

export const communityPostFetchAllStart = withMatcher(
    (): CommunityPostFetchAllStart => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_START)
);

export const communityPostFetchAllSuccess = withMatcher(
    (post: CommunityPost[]): CommunityPostFetchAllSuccess => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_SUCCESS, post)
);

export const communityPostFetchAllFailed = withMatcher(
    (error: Error): CommunityPostFetchAllFailed => 
    createAction(COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
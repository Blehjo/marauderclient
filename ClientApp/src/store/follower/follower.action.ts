import { FOLLOWER_ACTION_TYPES, Follower } from './follower.types';

import {
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type FollowerCreateStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.CREATE_START, { followerUser: number }
>;

export type FollowerCreateSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.CREATE_SUCCESS, 
    Follower[]
>;

export type FollowerCreateFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type FollowerUpdateStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.UPDATE_START,
    Follower
>;

export type FollowerUpdateSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.UPDATE_SUCCESS, 
    Follower[]
>;

export type FollowerUpdateFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type FollowerDeleteStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.DELETE_START, { followerId: number }
>;

export type FollowerDeleteSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.DELETE_SUCCESS, 
    Follower[]
>;

export type FollowerDeleteteFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type FollowerFetchSingleStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type FollowerFetchSingleSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Follower
>;

export type FollowerFetchSingleFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type FollowerFetchUserChatsStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_START,
    number
>;

export type FollowerFetchUserChatsSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_SUCCESS, 
    Follower[]
>;

export type FollowerFetchUserChatsFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_FAILED,
    Error
>;

export type FollowerFetchAllStart = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_ALL_START, { userId: string }
>;

export type FollowerFetchAllSuccess = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Follower[]
>;

export type FollowerFetchAllFailed = ActionWithPayload<
    FOLLOWER_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const followerCreateStart = withMatcher(
    (followerUser: number): FollowerCreateStart => 
    createAction(FOLLOWER_ACTION_TYPES.CREATE_START, { followerUser })
);

export const followerCreateSuccess = withMatcher(
    (follower: Follower[]): FollowerCreateSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.CREATE_SUCCESS, follower)
);

export const followerCreateFailed = withMatcher(
    (error: Error) => 
    createAction(FOLLOWER_ACTION_TYPES.CREATE_START, error)
);
 
export const followerUpdateStart = withMatcher(
    (follower: Follower): FollowerUpdateStart => 
    createAction(FOLLOWER_ACTION_TYPES.UPDATE_START, follower)
);

export const followerUpdateSuccess = withMatcher(
    (follower: Follower[]): FollowerUpdateSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.UPDATE_SUCCESS, follower)
);

export const followerUpdateFailed = withMatcher(
    (error: Error): FollowerUpdateFailed => 
    createAction(FOLLOWER_ACTION_TYPES.UPDATE_FAILED, error)
);

export const followerDeleteStart = withMatcher(
    (followerId: number): FollowerDeleteStart => 
    createAction(FOLLOWER_ACTION_TYPES.DELETE_START, { followerId })
);

export const followerDeleteSuccess = withMatcher(
    (follower: Follower[]): FollowerDeleteSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.DELETE_SUCCESS, follower)
);

export const followerDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(FOLLOWER_ACTION_TYPES.DELETE_START, error)
);

export const followerFetchSingleStart = withMatcher(
    (followerId: number): FollowerFetchSingleStart => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_SINGLE_START, followerId)
);

export const followerFetchSingleSuccess = withMatcher(
    (follower: Follower): FollowerFetchSingleSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, follower)
);

export const followerFetchSingleFailed = withMatcher(
    (error: Error): FollowerFetchSingleFailed => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const followerFetchUserChatsStart = withMatcher(
    (followerId: number): FollowerFetchUserChatsStart => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_START, followerId)
);

export const followerFetchUserChatsSuccess = withMatcher(
    (follower: Follower[]): FollowerFetchUserChatsSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_SUCCESS, follower)
);

export const followerFetchUserChatsFailed = withMatcher(
    (error: Error): FollowerFetchUserChatsFailed => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_USER_FOLLOWERS_FAILED, error)
);

export const followerFetchAllStart = withMatcher(
    (userId: string): FollowerFetchAllStart => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_ALL_START, { userId })
);

export const followerFetchAllSuccess = withMatcher(
    (follower: Follower[]): FollowerFetchAllSuccess => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_ALL_SUCCESS, follower)
);

export const followerFetchAllFailed = withMatcher(
    (error: Error): FollowerFetchAllFailed => 
    createAction(FOLLOWER_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
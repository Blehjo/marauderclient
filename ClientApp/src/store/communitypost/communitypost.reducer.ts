import { AnyAction } from 'redux';

import { CommunityPost } from './communitypost.types';

import {
    communityPostCreateFailed,
    communityPostCreateStart,
    communityPostCreateSuccess,
    communityPostDeleteFailed,
    communityPostDeleteSuccess,
    communityPostFetchAllFailed,
    communityPostFetchAllStart,
    communityPostFetchAllSuccess,
    communityPostFetchSingleFailed,
    communityPostFetchSingleSuccess,
    communityPostFetchUserPostsStart,
    communityPostFetchUserPostsSuccess,
    communityPostUpdateFailed,
    communityPostUpdateSuccess
} from './communitypost.action';

export type CommunityPostState = {
    readonly postId: number | null;
    readonly singlePost: CommunityPost | null;
    readonly userPosts: CommunityPost[];
    readonly posts: CommunityPost[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: CommunityPostState = {
    postId: null,
    singlePost: null,
    userPosts: [],
    posts: [],
    isLoading: false,
    error: null,
};

export const communityPostReducer = (
    state = INITIAL_STATE, action: AnyAction
): CommunityPostState => {
    if (
        communityPostFetchAllStart.match(action) || 
        communityPostCreateStart.match(action) ||
        communityPostFetchUserPostsStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        communityPostUpdateSuccess.match(action) ||
        communityPostFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singlePost: action.payload }
    }
    if (
        communityPostFetchUserPostsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userPosts: action.payload }
    }
    if (
        communityPostFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, posts: action.payload };
    } 
    if (
        communityPostCreateSuccess.match(action) ||
        communityPostDeleteSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userPosts: action.payload };
    } 
    if (
        communityPostCreateFailed.match(action) ||
        communityPostUpdateFailed.match(action) ||
        communityPostDeleteFailed.match(action) ||
        communityPostFetchSingleFailed.match(action) ||
        communityPostFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
import { AnyAction } from 'redux';

import { Post } from './post.types';

import {
    postCreateStart,
    postCreateSuccess,
    postCreateFailed,
    postUpdateStart,
    postUpdateSuccess,
    postUpdateFailed,
    postDeleteStart,
    postDeleteSuccess,
    postDeleteFailed,
    postFetchSingleStart,
    postFetchSingleSuccess,
    postFetchSingleFailed,
    postFetchAllStart,
    postFetchAllSuccess,
    postFetchAllFailed,
    postFetchUserPostsStart,
    postFetchUserPostsSuccess,
} from './post.action';

export type PostState = {
    readonly postId: number | null;
    readonly singlePost: Post | null;
    readonly userPosts: Post[];
    readonly posts: Post[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: PostState = {
    postId: null,
    singlePost: null,
    userPosts: [],
    posts: [],
    isLoading: false,
    error: null,
};

export const postReducer = (
    state = INITIAL_STATE, action: AnyAction
): PostState => {
    if (
        postFetchAllStart.match(action) || 
        postCreateStart.match(action) ||
        postFetchUserPostsStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        postUpdateSuccess.match(action) ||
        postFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singlePost: action.payload }
    }
    if (
        postFetchUserPostsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userPosts: action.payload }
    }
    if (
        postFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, posts: action.payload };
    } 
    if (
        postCreateSuccess.match(action) ||
        postDeleteSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userPosts: action.payload };
    } 
    if (
        postCreateFailed.match(action) ||
        postUpdateFailed.match(action) ||
        postDeleteFailed.match(action) ||
        postFetchSingleFailed.match(action) ||
        postFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
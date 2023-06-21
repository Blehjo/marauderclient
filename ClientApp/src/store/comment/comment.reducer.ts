import { AnyAction } from 'redux';

import { Comment } from './comment.types';

import {
    commentCreateStart,
    commentCreateSuccess,
    commentCreateFailed,
    commentUpdateStart,
    commentUpdateSuccess,
    commentUpdateFailed,
    commentDeleteStart,
    commentDeleteSuccess,
    commentDeleteFailed,
    commentFetchSingleStart,
    commentFetchSingleSuccess,
    commentFetchSingleFailed,
    commentFetchAllStart,
    commentFetchAllSuccess,
    commentFetchAllFailed,
} from './comment.action';

export type CommentState = {
    readonly commentId: number | null;
    readonly singleComment: Comment | null;
    readonly userComments: Comment[] | null;
    readonly comments: Comment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CommentState = {
    commentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const commentReducer = (
    state = INITIAL_STATE, action: AnyAction
): CommentState => {
    if (
        commentCreateStart.match(action) ||
        commentFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        commentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload }
    }
    if (
        commentCreateSuccess.match(action) ||
        commentUpdateSuccess.match(action) ||
        commentDeleteSuccess.match(action) ||
        commentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload };
    } 
    if (
        commentCreateFailed.match(action) ||
        commentUpdateFailed.match(action) ||
        commentDeleteFailed.match(action) ||
        commentFetchSingleFailed.match(action) ||
        commentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
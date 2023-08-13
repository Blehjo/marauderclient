import { AnyAction } from 'redux';

import {
    commentCreateFailed,
    commentCreateStart,
    commentCreateSuccess,
    commentDeleteFailed,
    commentDeleteSuccess,
    commentFetchAllFailed,
    commentFetchAllStart,
    commentFetchAllSuccess,
    commentFetchSingleFailed,
    commentFetchSingleSuccess,
    commentUpdateFailed,
    commentUpdateSuccess
} from './userchatcomment.action';

import { UserChatComment } from './userchatcomment.types';

export type UserChatCommentState = {
    readonly userChatCommentId: number | null;
    readonly singleComment: UserChatComment | null;
    readonly userComments: UserChatComment[] | null;
    readonly comments: UserChatComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: UserChatCommentState = {
    userChatCommentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const userChatCommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): UserChatCommentState => {
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
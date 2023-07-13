import { AnyAction } from 'redux';

import { ChatComment } from './chatcomment.types';

import {
    chatcommentCreateFailed,
    chatcommentCreateStart,
    chatcommentCreateSuccess,
    chatcommentDeleteFailed,
    chatcommentDeleteStart,
    chatcommentDeleteSuccess,
    chatcommentFetchAllFailed,
    chatcommentFetchAllStart,
    chatcommentFetchAllSuccess,
    chatcommentFetchSingleFailed,
    chatcommentFetchSingleStart,
    chatcommentFetchSingleSuccess,
    chatcommentUpdateFailed,
    chatcommentUpdateStart,
    chatcommentUpdateSuccess
} from './chatcomment.action';

export type ChatCommentState = {
    readonly chatcommentId: number | null;
    readonly singleChatcomment: ChatComment | null;
    readonly userChatcomments: ChatComment[];
    readonly chatcomments: ChatComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: ChatCommentState = {
    chatcommentId: null,
    singleChatcomment: null,
    userChatcomments: [],
    chatcomments: [],
    isLoading: false,
    error: null,
};

export const chatcommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): ChatCommentState => {
    if (
        chatcommentFetchAllStart.match(action) ||
        chatcommentFetchSingleStart.match(action) ||
        chatcommentCreateStart.match(action) ||
        chatcommentDeleteStart.match(action) ||
        chatcommentUpdateStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        chatcommentUpdateSuccess.match(action) ||
        chatcommentDeleteSuccess.match(action) ||
        chatcommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, chatcomments: action.payload };
    } 
    if (
        chatcommentCreateSuccess.match(action) ||
        chatcommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userChatcomments: action.payload }
    }
    if (
        chatcommentCreateFailed.match(action) ||
        chatcommentUpdateFailed.match(action) ||
        chatcommentDeleteFailed.match(action) ||
        chatcommentFetchSingleFailed.match(action) ||
        chatcommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
import { AnyAction } from 'redux';

import { MessageComment } from './messagecomment.types';

import {
    messagecommentCreateStart,
    messagecommentCreateSuccess,
    messagecommentCreateFailed,
    messagecommentUpdateStart,
    messagecommentUpdateSuccess,
    messagecommentUpdateFailed,
    messagecommentDeleteStart,
    messagecommentDeleteSuccess,
    messagecommentDeleteFailed,
    messagecommentFetchSingleStart,
    messagecommentFetchSingleSuccess,
    messagecommentFetchSingleFailed,
    messagecommentFetchAllStart,
    messagecommentFetchAllSuccess,
    messagecommentFetchAllFailed,
} from './messagecomment.action';

export type MessageCommentState = {
    readonly messagecommentId: number | null;
    readonly singleMessagecomment: MessageComment | null;
    readonly userMessagecomments: MessageComment[];
    readonly messagecomments: MessageComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: MessageCommentState = {
    messagecommentId: null,
    singleMessagecomment: null,
    userMessagecomments: [],
    messagecomments: [],
    isLoading: false,
    error: null,
};

export const messagecommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): MessageCommentState => {
    if (
        messagecommentFetchAllStart.match(action) ||
        messagecommentFetchSingleStart.match(action) ||
        messagecommentCreateStart.match(action) ||
        messagecommentDeleteStart.match(action) ||
        messagecommentUpdateStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        messagecommentUpdateSuccess.match(action) ||
        messagecommentDeleteSuccess.match(action) ||
        messagecommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, messagecomments: action.payload };
    } 
    if (
        messagecommentCreateSuccess.match(action) ||
        messagecommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userMessagecomments: action.payload}
    }
    if (
        messagecommentCreateFailed.match(action) ||
        messagecommentUpdateFailed.match(action) ||
        messagecommentDeleteFailed.match(action) ||
        messagecommentFetchSingleFailed.match(action) ||
        messagecommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
}
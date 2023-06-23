import { AnyAction } from 'redux';

import { ChannelComment } from './channelcomment.types';

import {
    channelcommentCreateFailed,
    channelcommentCreateSuccess,
    channelcommentDeleteFailed,
    channelcommentDeleteSuccess,
    channelcommentFetchAllFailed,
    channelcommentFetchAllStart,
    channelcommentFetchAllSuccess,
    channelcommentFetchSingleFailed,
    channelcommentFetchSingleSuccess,
    channelcommentUpdateFailed,
    channelcommentUpdateSuccess
} from './channelcomment.action';

export type ChannelCommentState = {
    readonly channelCommentId: number | null;
    readonly singleComment: ChannelComment | null;
    readonly userComments: ChannelComment[];
    readonly comments: ChannelComment[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: ChannelCommentState = {
    channelCommentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const channelcommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): ChannelCommentState => {
    if (
        channelcommentFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        channelcommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload }
    }
    if (
        channelcommentCreateSuccess.match(action) ||
        channelcommentUpdateSuccess.match(action) ||
        channelcommentDeleteSuccess.match(action) ||
        channelcommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload };
    } 
    if (
        channelcommentCreateFailed.match(action) ||
        channelcommentUpdateFailed.match(action) ||
        channelcommentDeleteFailed.match(action) ||
        channelcommentFetchSingleFailed.match(action) ||
        channelcommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
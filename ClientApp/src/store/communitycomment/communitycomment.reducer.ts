import { AnyAction } from 'redux';

import { CommunityComment } from './communitycomment.types';

import {
    communityCommentCreateFailed,
    communityCommentCreateStart,
    communityCommentCreateSuccess,
    communityCommentDeleteFailed,
    communityCommentDeleteSuccess,
    communityCommentFetchAllFailed,
    communityCommentFetchAllStart,
    communityCommentFetchAllSuccess,
    communityCommentFetchSingleFailed,
    communityCommentFetchSingleSuccess,
    communityCommentUpdateFailed,
    communityCommentUpdateSuccess
} from './communitycomment.action';

export type CommunityCommentState = {
    readonly commentId: number | null;
    readonly singleComment: CommunityComment | null;
    readonly userComments: CommunityComment[] | null;
    readonly comments: CommunityComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CommunityCommentState = {
    commentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const communityCommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): CommunityCommentState => {
    if (
        communityCommentCreateStart.match(action) ||
        communityCommentFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        communityCommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload }
    }
    if (
        communityCommentCreateSuccess.match(action) ||
        communityCommentUpdateSuccess.match(action) ||
        communityCommentDeleteSuccess.match(action) ||
        communityCommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload };
    } 
    if (
        communityCommentCreateFailed.match(action) ||
        communityCommentUpdateFailed.match(action) ||
        communityCommentDeleteFailed.match(action) ||
        communityCommentFetchSingleFailed.match(action) ||
        communityCommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
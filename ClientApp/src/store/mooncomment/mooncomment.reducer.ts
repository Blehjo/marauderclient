import { AnyAction } from 'redux';

import { MoonComment } from './mooncomment.types';

import {
    moonCommentCreateStart,
    moonCommentCreateSuccess,
    moonCommentCreateFailed,
    moonCommentUpdateStart,
    moonCommentUpdateSuccess,
    moonCommentUpdateFailed,
    moonCommentDeleteStart,
    moonCommentDeleteSuccess,
    moonCommentDeleteFailed,
    moonCommentFetchSingleStart,
    moonCommentFetchSingleSuccess,
    moonCommentFetchSingleFailed,
    moonCommentFetchAllStart,
    moonCommentFetchAllSuccess,
    moonCommentFetchAllFailed,
} from './mooncomment.action';

export type MoonCommentState = {
    readonly moonCommentId: number | null;
    readonly singleComment: MoonComment | null;
    readonly userComments: MoonComment[] | null;
    readonly mooncomments: MoonComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: MoonCommentState = {
    moonCommentId: null,
    singleComment: null,
    userComments: [],
    mooncomments: [],
    isLoading: false,
    error: null,
};

export const moonCommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): MoonCommentState => {
    if (
        moonCommentFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        moonCommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, mooncomments: action.payload }
    }
    if (
        moonCommentCreateSuccess.match(action) ||
        moonCommentUpdateSuccess.match(action) ||
        moonCommentDeleteSuccess.match(action) ||
        moonCommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, mooncomments: action.payload };
    } 
    if (
        moonCommentCreateFailed.match(action) ||
        moonCommentUpdateFailed.match(action) ||
        moonCommentDeleteFailed.match(action) ||
        moonCommentFetchSingleFailed.match(action) ||
        moonCommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
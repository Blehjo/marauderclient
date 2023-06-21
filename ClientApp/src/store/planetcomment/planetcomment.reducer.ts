import { AnyAction } from 'redux';

import { PlanetComment } from './planetcomment.types';

import {
    planetcommentCreateStart,
    planetcommentCreateSuccess,
    planetcommentCreateFailed,
    planetcommentUpdateStart,
    planetcommentUpdateSuccess,
    planetcommentUpdateFailed,
    planetcommentDeleteStart,
    planetcommentDeleteSuccess,
    planetcommentDeleteFailed,
    planetcommentFetchSingleStart,
    planetcommentFetchSingleSuccess,
    planetcommentFetchSingleFailed,
    planetcommentFetchAllStart,
    planetcommentFetchAllSuccess,
    planetcommentFetchAllFailed,
} from './planetcomment.action';

export type PlanetCommentState = {
    readonly planetCommentId: number | null;
    readonly singleComment: PlanetComment | null;
    readonly userComments: PlanetComment[] | null;
    readonly comments: PlanetComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: PlanetCommentState = {
    planetCommentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const planetcommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): PlanetCommentState => {
    if (
        planetcommentFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        planetcommentFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload }
    }
    if (
        planetcommentCreateSuccess.match(action) ||
        planetcommentUpdateSuccess.match(action) ||
        planetcommentDeleteSuccess.match(action) ||
        planetcommentFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, comments: action.payload };
    } 
    if (
        planetcommentCreateFailed.match(action) ||
        planetcommentUpdateFailed.match(action) ||
        planetcommentDeleteFailed.match(action) ||
        planetcommentFetchSingleFailed.match(action) ||
        planetcommentFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
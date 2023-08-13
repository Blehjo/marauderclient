import { AnyAction } from 'redux';

import { GltfComment } from './gltfcomment.types';

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
} from './gltfcomment.action';

export type GltfCommentState = {
    readonly gltfCommentId: number | null;
    readonly singleComment: GltfComment | null;
    readonly userComments: GltfComment[] | null;
    readonly comments: GltfComment[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: GltfCommentState = {
    gltfCommentId: null,
    singleComment: null,
    userComments: [],
    comments: [],
    isLoading: false,
    error: null,
};

export const gltfcommentReducer = (
    state = INITIAL_STATE, action: AnyAction
): GltfCommentState => {
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
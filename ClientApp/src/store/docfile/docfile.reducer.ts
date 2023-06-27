import { AnyAction } from 'redux';

import { DocFile } from './docfile.types';

import {
    docFileCreateFailed,
    docFileCreateSuccess,
    docFileDeleteFailed,
    docFileDeleteSuccess,
    docFileFetchAllFailed,
    docFileFetchAllStart,
    docFileFetchAllSuccess,
    docFileFetchSingleFailed,
    docFileFetchSingleSuccess,
    docFileUpdateFailed,
    docFileUpdateSuccess
} from './docfile.action';

export type DocFileState = {
    readonly docFileId: number | null;
    readonly singleDocFile: DocFile | null;
    readonly userDocFiles: DocFile[];
    readonly docFiles: DocFile[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: DocFileState = {
    docFileId: null,
    singleDocFile: null,
    userDocFiles: [],
    docFiles: [],
    isLoading: false,
    error: null,
};

export const docFileReducer = (
    state = INITIAL_STATE, action: AnyAction
): DocFileState => {
    if (
        docFileFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        docFileFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleDocFile: action.payload }
    }
    if (
        docFileCreateSuccess.match(action) ||
        docFileUpdateSuccess.match(action) ||
        docFileDeleteSuccess.match(action) ||
        docFileFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, docFiles: action.payload };
    } 
    if (
        docFileCreateFailed.match(action) ||
        docFileUpdateFailed.match(action) ||
        docFileDeleteFailed.match(action) ||
        docFileFetchSingleFailed.match(action) ||
        docFileFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
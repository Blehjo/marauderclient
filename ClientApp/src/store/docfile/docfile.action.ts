import { DOCFILE_ACTION_TYPES, DocFile } from './docfile.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type DocFileCreateStart = ActionWithPayload<
    DOCFILE_ACTION_TYPES.CREATE_START, { title: string }
>;

export type DocFileCreateSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.CREATE_SUCCESS, 
    DocFile[]
>;

export type DocFileCreateFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type DocFileUpdateStart = ActionWithPayload<
    DOCFILE_ACTION_TYPES.UPDATE_START,
    { docFileId: number, title: string }
>;

export type DocFileUpdateSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.UPDATE_SUCCESS, 
    DocFile[]
>;

export type DocFileUpdateFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type DocFileDeleteStart = ActionWithPayload<
    DOCFILE_ACTION_TYPES.DELETE_START,
    { docFileId: number }
>;

export type DocFileDeleteSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.DELETE_SUCCESS, 
    DocFile[]
>;

export type DocFileDeleteteFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type DocFileFetchSingleStart = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_SINGLE_START,
    { docFileId: number }
>;

export type DocFileFetchSingleSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    DocFile
>;

export type DocFileFetchSingleFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type DocFileFetchAllUserStart = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_ALL_USER_START, { userId: number }
>;

export type DocFileFetchAllUserSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, 
    DocFile[]
>;

export type DocFileFetchAllUserFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_ALL_USER_FAILED,
    Error
>;

export type DocFileFetchAllStart = Action<
    DOCFILE_ACTION_TYPES.FETCH_ALL_START
>;

export type DocFileFetchAllSuccess = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    DocFile[]
>;

export type DocFileFetchAllFailed = ActionWithPayload<
    DOCFILE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const docFileCreateStart = withMatcher(
    (title: string): DocFileCreateStart => 
    createAction(DOCFILE_ACTION_TYPES.CREATE_START, { title })
);

export const docFileCreateSuccess = withMatcher(
    (docFile: DocFile[]): DocFileCreateSuccess => 
    createAction(DOCFILE_ACTION_TYPES.CREATE_SUCCESS, docFile)
);

export const docFileCreateFailed = withMatcher(
    (error: Error) => 
    createAction(DOCFILE_ACTION_TYPES.CREATE_START, error)
);
 
export const docFileUpdateStart = withMatcher(
    (docFileId: number, title: string): DocFileUpdateStart => 
    createAction(DOCFILE_ACTION_TYPES.UPDATE_START, { docFileId, title })
);

export const docFileUpdateSuccess = withMatcher(
    (docFile: DocFile[]): DocFileUpdateSuccess => 
    createAction(DOCFILE_ACTION_TYPES.UPDATE_SUCCESS, docFile)
);

export const docFileUpdateFailed = withMatcher(
    (error: Error): DocFileUpdateFailed => 
    createAction(DOCFILE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const docFileDeleteStart = withMatcher(
    (docFileId: number): DocFileDeleteStart => 
    createAction(DOCFILE_ACTION_TYPES.DELETE_START, { docFileId })
);

export const docFileDeleteSuccess = withMatcher(
    (docFile: DocFile[]): DocFileDeleteSuccess => 
    createAction(DOCFILE_ACTION_TYPES.DELETE_SUCCESS, docFile)
);

export const docFileDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(DOCFILE_ACTION_TYPES.DELETE_START, error)
);

export const docFileFetchSingleStart = withMatcher(
    (docFileId: number): DocFileFetchSingleStart => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_SINGLE_START, { docFileId })
);

export const docFileFetchSingleSuccess = withMatcher(
    (docFile: DocFile): DocFileFetchSingleSuccess => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, docFile)
);

export const docFileFetchSingleFailed = withMatcher(
    (error: Error): DocFileFetchSingleFailed => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const docFileFetchAllUserStart = withMatcher(
    (userId: number): DocFileFetchAllUserStart => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_USER_START, { userId })
);

export const docFileFetchAllUserSuccess = withMatcher(
    (docFiles: DocFile[]): DocFileFetchAllUserSuccess => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, docFiles)
);

export const docFileFetchAllUserFailed = withMatcher(
    (error: Error): DocFileFetchAllUserFailed => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_USER_FAILED, error)
);

export const docFileFetchAllStart = withMatcher(
    (): DocFileFetchAllStart => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_START)
);

export const docFileFetchAllSuccess = withMatcher(
    (docFiles: DocFile[]): DocFileFetchAllSuccess => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, docFiles)
);

export const docFileFetchAllFailed = withMatcher(
    (error: Error): DocFileFetchAllFailed => 
    createAction(DOCFILE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
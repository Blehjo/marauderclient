import { all, call, put, takeLatest } from 'typed-redux-saga';

import { DOCFILE_ACTION_TYPES } from './docfile.types';

import {
    DocFileCreateStart,
    DocFileDeleteStart,
    DocFileFetchAllUserStart,
    DocFileFetchSingleStart,
    DocFileUpdateStart,
    docFileCreateFailed,
    docFileCreateSuccess,
    docFileDeleteFailed,
    docFileDeleteSuccess,
    docFileFetchAllFailed,
    docFileFetchAllSuccess,
    docFileFetchAllUserFailed,
    docFileFetchAllUserSuccess,
    docFileFetchSingleFailed,
    docFileFetchSingleSuccess,
    docFileUpdateFailed,
    docFileUpdateSuccess
} from './docfile.action';

import {
    addDocFile,
    deleteDocFile,
    editDocFile,
    getAllDocFiles,
    getSingleDocFile,
    getUserDocFiles
} from '../../utils/api/docfile.api';

export function* createDocFile({ payload: { title }}: DocFileCreateStart ) {
    try {
        const docFiles = yield* call(
            addDocFile,
            title
        ); 
        yield* put(docFileCreateSuccess(docFiles));
    } catch (error) {
        yield* put(docFileCreateFailed(error as Error));
    }
}

export function* updateDocFile({ payload: { docFileId, title }}: DocFileUpdateStart) {
    try {
        const docFile = yield* call(
            editDocFile,
            docFileId,
            title
        ); 
        yield* put(docFileUpdateSuccess(docFile));
    } catch (error) {
        yield* put(docFileUpdateFailed(error as Error));
    }
}

export function* removeDocFile({ payload: { docFileId }}: DocFileDeleteStart) {
    try {
        const docFiles = yield* call(
            deleteDocFile,
            docFileId
        ); 
        yield* put(docFileDeleteSuccess(docFiles));
    } catch (error) {
        yield* put(docFileDeleteFailed(error as Error));
    }
}

export function* fetchUserDocFiles({ payload: { userId }}: DocFileFetchAllUserStart) {
    try {
        const docFiles  = yield* call(getUserDocFiles, userId);
        if (!docFiles) return;
        yield* put(docFileFetchAllUserSuccess(docFiles));
    } catch (error) {
        yield* put(docFileFetchAllUserFailed(error as Error));
    }
}

export function* fetchSingleDocFile({ 
    payload: { docFileId } }: DocFileFetchSingleStart) {
    try {
        const docFile = yield* call(
            getSingleDocFile,
            docFileId 
        );
        yield* put(docFileFetchSingleSuccess(docFile));
    } catch (error) {
        yield* put(docFileFetchSingleFailed(error as Error));
    }
}

export function* fetchAllDocFiles() {
    try {
        const docFiles = yield* call(getAllDocFiles);
        yield* put(docFileFetchAllSuccess(docFiles));
    } catch (error) {
        yield* put(docFileFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.CREATE_START, 
        createDocFile
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.UPDATE_START, 
        updateDocFile
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.DELETE_START, 
        removeDocFile
    );
}

export function* onfetchUserdocFilesStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.FETCH_ALL_USER_START, 
        fetchUserDocFiles
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleDocFile
    );
}
  
export function* onFetchStart() {
    yield* takeLatest(
        DOCFILE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllDocFiles
    );
}

export function* docFileSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onfetchUserdocFilesStart),
        call(onFetchSingleStart),
        call(onFetchStart)
    ]);
}
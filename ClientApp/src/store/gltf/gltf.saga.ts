import { all, call, put, takeLatest } from 'typed-redux-saga';

import {GLTF_ACTION_TYPES, Gltf } from './gltf.types';

import {
  GltfCreateStart,
  GltfDeleteStart,
  GltfFetchOtherUserStart,
  GltfFetchSingleStart,
  GltfFetchUserStart,
  GltfUpdateStart,
  gltfCreateFailed,
  gltfCreateSuccess,
  gltfDeleteFailed,
  gltfDeleteSuccess,
  gltfFetchAllFailed,
  gltfFetchAllSuccess,
  gltfFetchOtherUserSuccess,
  gltfFetchSingleFailed,
  gltfFetchSingleSuccess,
  gltfUpdateSuccess
} from './gltf.action';

import {
  addGltf,
  deleteGltf,
  editGltf,
  getAllGltfs,
  getOtherUsersGltfs,
  getSingleGltf,
  getUsersGltfs
} from '../../utils/api/gltf.api';

export function* createGltf({ payload: { fileInformation }}: GltfCreateStart ) {
    try {
        const gltfs = yield* call(
            addGltf,
            fileInformation
        ); 
        yield* put(gltfCreateSuccess(gltfs));
    } catch (error) {
        yield* put(gltfCreateFailed(error as Error));
    }
}

export function* updateGltf({ payload: { gltfId, fileInformation }}: GltfUpdateStart) {
    try {
        const gltf = yield* call(
            editGltf,
            gltfId,
            fileInformation
        ); 
        yield* put(gltfUpdateSuccess(gltf));
    } catch (error) {
        yield* put(gltfCreateFailed(error as Error));
    }
}

export function* removeGltf({ payload: { gltfId }}: GltfDeleteStart) {
    try {
        const gltfs = yield* call(
            deleteGltf,
            gltfId
        ); 
        yield* put(gltfDeleteSuccess(gltfs));
    } catch (error) {
        yield* put(gltfDeleteFailed(error as Error));
    }
}

export function* fetchUserGltfs({}: GltfFetchUserStart) {
    try {
        const gltf  = yield* call(getUsersGltfs);
        if (!gltf) return;
        yield* put(gltfFetchAllSuccess(gltf));
    } catch (error) {
        yield* put(gltfFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUserGltfs({ payload: { userId }}: GltfFetchOtherUserStart) {
    try {
        const gltf  = yield* call(getOtherUsersGltfs, userId);
        if (!gltf) return;
        yield* put(gltfFetchOtherUserSuccess(gltf));
    } catch (error) {
        yield* put(gltfFetchAllFailed(error as Error));
    }
}

export function* fetchSingleGltf({ 
    payload: { gltfId } }: GltfFetchSingleStart) {
    try {
        const gltf = yield* call(
            getSingleGltf,
            gltfId 
        );
        yield* put(gltfFetchSingleSuccess(gltf as Gltf));
    } catch (error) {
        yield* put(gltfFetchSingleFailed(error as Error));
    }
}

export function* fetchAllGltfs() {
    try {
        const gltfs = yield* call(getAllGltfs);
        yield* put(gltfFetchAllSuccess(gltfs));
    } catch (error) {
        yield* put(gltfFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.CREATE_START, 
        createGltf
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.UPDATE_START, 
        updateGltf
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.DELETE_START, 
        removeGltf
    );
}

export function* onFetchUserGltfsStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.FETCH_USER_START, 
        fetchUserGltfs
    );
}

export function* onFetchOtherUserGltfsStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.FETCH_OTHER_USER_START, 
        fetchOtherUserGltfs
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleGltf
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
       GLTF_ACTION_TYPES.FETCH_ALL_START,
        fetchAllGltfs
    );
}

export function* gltfSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserGltfsStart),
        call(onFetchOtherUserGltfsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
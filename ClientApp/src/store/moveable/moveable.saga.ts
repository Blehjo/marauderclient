import { all, call, put, takeLatest } from 'typed-redux-saga';

import { MOVEABLE_ACTION_TYPES } from './moveable.types';

import {
    MoveableCreateStart,
    MoveableDeleteStart,
    MoveableFetchAllUserStart,
    MoveableFetchSingleStart,
    MoveableUpdateStart,
    moveableCreateFailed,
    moveableCreateSuccess,
    moveableDeleteFailed,
    moveableDeleteSuccess,
    moveableFetchAllFailed,
    moveableFetchAllSuccess,
    moveableFetchAllUserFailed,
    moveableFetchAllUserSuccess,
    moveableFetchSingleFailed,
    moveableFetchSingleSuccess,
    moveableUpdateFailed,
    moveableUpdateSuccess
} from './moveable.action';

import {
    addMoveable,
    deleteMoveable,
    editMoveable,
    getAllMoveables,
    getSingleMoveable,
    getUserMoveables
} from '../../utils/api/moveable.api';

export function* createMoveable({ payload: { xCoord, yCoord, zCoord, fileId }}: MoveableCreateStart ) {
    try {
        const moveables = yield* call(
            addMoveable,
            xCoord,
            yCoord,
            zCoord,
            fileId
        ); 
        yield* put(moveableCreateSuccess(moveables));
    } catch (error) {
        yield* put(moveableCreateFailed(error as Error));
    }
}

export function* updateMoveable({ payload: { moveableId, xCoord, yCoord, zCoord, fileId }}: MoveableUpdateStart) {
    try {
        const moveable = yield* call(
            editMoveable,
            moveableId,
            xCoord,
            yCoord,
            zCoord,
            fileId
        ); 
        yield* put(moveableUpdateSuccess(moveable));
    } catch (error) {
        yield* put(moveableUpdateFailed(error as Error));
    }
}

export function* removeMoveable({ payload: { moveableId }}: MoveableDeleteStart) {
    try {
        const moveables = yield* call(
            deleteMoveable,
            moveableId
        ); 
        yield* put(moveableDeleteSuccess(moveables));
    } catch (error) {
        yield* put(moveableDeleteFailed(error as Error));
    }
}

export function* fetchUserMoveables({ payload: { userId }}: MoveableFetchAllUserStart) {
    try {
        const moveables  = yield* call(getUserMoveables, userId);
        if (!moveables) return;
        yield* put(moveableFetchAllUserSuccess(moveables));
    } catch (error) {
        yield* put(moveableFetchAllUserFailed(error as Error));
    }
}

export function* fetchSingleMoveable({ 
    payload: { moveableId } }: MoveableFetchSingleStart) {
    try {
        const moveable = yield* call(
            getSingleMoveable,
            moveableId 
        );
        yield* put(moveableFetchSingleSuccess(moveable));
    } catch (error) {
        yield* put(moveableFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMoveables() {
    try {
        const moveables = yield* call(getAllMoveables);
        yield* put(moveableFetchAllSuccess(moveables));
    } catch (error) {
        yield* put(moveableFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.CREATE_START, 
        createMoveable
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.UPDATE_START, 
        updateMoveable
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.DELETE_START, 
        removeMoveable
    );
}

export function* onfetchUserMoveablesStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_START, 
        fetchUserMoveables
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMoveable
    );
}
  
export function* onFetchStart() {
    yield* takeLatest(
        MOVEABLE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMoveables
    );
}

export function* moveableSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onfetchUserMoveablesStart),
        call(onFetchSingleStart),
        call(onFetchStart)
    ]);
}
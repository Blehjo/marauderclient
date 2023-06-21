import { takeLatest, put, all, call } from 'typed-redux-saga';

import { TOOL_ACTION_TYPES } from './tool.types';

import {
    setIsToolOpen
} from './tool.action';

export function* closeItem() {
    try {
        yield put(setIsToolOpen(false));
    } catch (error) {
        yield error;
    }
}

export function* openItem() {
    try {
        yield put(setIsToolOpen(true));
    } catch (error) {
        yield error;
    }
}

export function* onPostCloseStart() {
    yield takeLatest(TOOL_ACTION_TYPES.SET_IS_TOOL_OPEN, closeItem);
}

export function* onPostOpenStart() {
    yield takeLatest(TOOL_ACTION_TYPES.SET_IS_TOOL_OPEN, openItem);
}

export function* toolSagas() {
    yield all([
        call(onPostCloseStart),
        call(onPostOpenStart)
    ]);
}
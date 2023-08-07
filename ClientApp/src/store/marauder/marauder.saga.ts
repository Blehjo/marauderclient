import { all, call, put, takeLatest } from 'typed-redux-saga';

import { MARAUDER_ACTION_TYPES, Marauder } from './marauder.types';


import {
    getMarauders,
    getSingleMarauder
} from '../../utils/api/user.api';
import { MarauderFetchSingleStart, MarauderSetIdStart, marauderFetchAllFailed, marauderFetchAllSuccess, marauderFetchSingleFailed, marauderFetchSingleSuccess, marauderSetIdStart, marauderSetIdSuccess } from './marauder.action';

export function* setId({ payload: { marauderId }}: MarauderSetIdStart) {
    yield* put(marauderSetIdSuccess(marauderId));
}

export function* fetchMarauders() {
    try {
        const marauders = yield* call(
            getMarauders
        );
        if (!marauders) return;
        yield* put(marauderFetchAllSuccess(marauders));
    } catch (error) {
        yield* put(marauderFetchAllFailed(error as Error));
    }
}

export function* fetchSingleMarauderAsync({ 
    payload: { userId } }: MarauderFetchSingleStart) {
    try {
        const marauderSnapshot = yield* call(
            getSingleMarauder,
            userId 
        );
        yield* put(marauderFetchSingleSuccess(marauderSnapshot as Marauder));
    } catch (error) {
        yield* put(marauderFetchSingleFailed(error as Error));
    }
}

export function* onSetId() {
    yield* takeLatest(
        MARAUDER_ACTION_TYPES.SET_ID_START, 
        setId
    );
}

export function* onFetchSingleMarauderStart() {
    yield* takeLatest(
        MARAUDER_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMarauderAsync
    );
}

export function* onFetchMaraudersStart() {
    yield* takeLatest(
        MARAUDER_ACTION_TYPES.FETCH_ALL_START, 
        fetchMarauders
    );
}

export function* marauderSagas() {
    yield* all([
        call(onSetId),
        call(onFetchSingleMarauderStart),
        call(onFetchMaraudersStart)
    ]);
}
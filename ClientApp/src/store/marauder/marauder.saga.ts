import { all, call, put, takeLatest } from 'typed-redux-saga';

import { MARAUDER_ACTION_TYPES, Marauder } from './marauder.types';


import {
    getMarauders,
    getSingleMarauder
} from '../../utils/api/user.api';
import { MarauderFetchSingleStart, marauderFetchAllFailed, marauderFetchAllSuccess, marauderFetchSingleFailed, marauderFetchSingleSuccess } from './marauder.action';

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
        call(onFetchSingleMarauderStart),
        call(onFetchMaraudersStart)
    ]);
}
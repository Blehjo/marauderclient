import { takeLatest, put, all, call } from 'typed-redux-saga';

import { Pilot, PILOT_ACTION_TYPES } from './pilot.types';

import {

    pilotFetchSingleStart,
    pilotFetchSingleSuccess,
    pilotFetchSingleFailed,
    pilotFetchAllStart,
    pilotFetchAllSuccess,
    pilotFetchAllFailed,
    PilotFetchAllStart,
    PilotFetchSingleStart,
} from './pilot.action';

import { 
    getPilots,
    getSinglePilot,
    getSingleUser,
} from '../../utils/api/user.api';

export function* fetchPilots() {
    try {
        const pilots = yield* call(
            getPilots
        );
        if (!pilots) return;
        yield* put(pilotFetchAllSuccess(pilots));
    } catch (error) {
        yield* put(pilotFetchAllFailed(error as Error));
    }
}

export function* fetchSinglePilotAsync({ 
    payload: { userId } }: PilotFetchSingleStart) {
    try {
        const pilotSnapshot = yield* call(
            getSinglePilot,
            userId 
        );
        yield* put(pilotFetchSingleSuccess(pilotSnapshot as Pilot));
    } catch (error) {
        yield* put(pilotFetchSingleFailed(error as Error));
    }
}

export function* onFetchSinglePilotStart() {
    yield* takeLatest(
        PILOT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePilotAsync
    );
}

export function* onFetchPilotsStart() {
    yield* takeLatest(
        PILOT_ACTION_TYPES.FETCH_ALL_START, 
        fetchPilots
    );
}

export function* pilotSagas() {
    yield* all([
        call(onFetchSinglePilotStart),
        call(onFetchPilotsStart)
    ]);
}
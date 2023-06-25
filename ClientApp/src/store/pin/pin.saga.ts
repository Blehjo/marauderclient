import { all, call, put, takeLatest } from 'typed-redux-saga';

import { PIN_ACTION_TYPES } from './pin.types';

import {
    PinCreateStart,
    PinDeleteStart,
    PinFetchSingleStart,
    PinUpdateStart,
    pinCreateFailed,
    pinCreateSuccess,
    pinDeleteFailed,
    pinDeleteSuccess,
    pinFetchAllFailed,
    pinFetchAllSuccess,
    pinFetchSingleFailed,
    pinFetchSingleSuccess,
    pinUpdateFailed,
    pinUpdateSuccess
} from './pin.action';

import {
    addPin,
    deletePin,
    editPin,
    getAllPins,
    getSinglePin,
    getUserPins
} from '../../utils/api/pin.api';
import { PanelCreateStart } from '../panel/panel.action';

export function* createPin({ payload: { pinLocation, isAnalog, deviceId }}: PinCreateStart ) {
    try {
        const pins = yield* call(
            addPin,
            pinLocation,
            isAnalog,
            deviceId
        ); 
        yield* put(pinCreateSuccess(pins));
    } catch (error) {
        yield* put(pinCreateFailed(error as Error));
    }
}

export function* updatePin({ payload: { pinId, pinLocation, isAnalog, deviceId }}: PinUpdateStart) {
    try {
        const pin = yield* call(
            editPin,
            pinId,
            pinLocation,
            isAnalog,
            deviceId
        ); 
        yield* put(pinUpdateSuccess(pin));
    } catch (error) {
        yield* put(pinUpdateFailed(error as Error));
    }
}

export function* removePin({ payload: { pinId }}: PinDeleteStart) {
    try {
        const pins = yield* call(
            deletePin,
            pinId
        ); 
        yield* put(pinDeleteSuccess(pins));
    } catch (error) {
        yield* put(pinDeleteFailed(error as Error));
    }
}

export function* fetchSinglePin({ 
    payload: { pinId } }: PinFetchSingleStart) {
    try {
        const pin = yield* call(
            getSinglePin,
            pinId 
        );
        yield* put(pinFetchSingleSuccess(pin));
    } catch (error) {
        yield* put(pinFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPins() {
    try {
        const pins = yield* call(getAllPins);
        yield* put(pinFetchAllSuccess(pins));
    } catch (error) {
        yield* put(pinFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        PIN_ACTION_TYPES.CREATE_START, 
        createPin
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        PIN_ACTION_TYPES.UPDATE_START, 
        updatePin
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        PIN_ACTION_TYPES.DELETE_START, 
        removePin
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        PIN_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePin
    );
}
  
export function* onFetchStart() {
    yield* takeLatest(
        PIN_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPins
    );
}

export function* pinSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchStart)
    ]);
}
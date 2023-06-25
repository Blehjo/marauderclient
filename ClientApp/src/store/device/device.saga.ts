import { all, call, put, takeLatest } from 'typed-redux-saga';

import { DEVICE_ACTION_TYPES } from './device.types';

import {
    DeviceCreateStart,
    DeviceDeleteStart,
    DeviceFetchSingleStart,
    DeviceUpdateStart,
    deviceCreateFailed,
    deviceCreateSuccess,
    deviceDeleteFailed,
    deviceDeleteSuccess,
    deviceFetchAllFailed,
    deviceFetchAllSuccess,
    deviceFetchSingleFailed,
    deviceFetchSingleSuccess,
    deviceUpdateSuccess
} from './device.action';

import {
    addDevice,
    deleteDevice,
    editDevice,
    getAllDevices,
    getSingleDevice
} from '../../utils/api/device.api';

export function* createDevice({ payload: { deviceName, deviceType }}: DeviceCreateStart ) {
    try {
        const devices = yield* call(
            addDevice,
            deviceName,
            deviceType
        ); 
        yield* put(deviceCreateSuccess(devices));
    } catch (error) {
        yield* put(deviceCreateFailed(error as Error));
    }
}

export function* updateDevice({ payload: { deviceId, deviceName, deviceType }}: DeviceUpdateStart) {
    try {
        const device = yield* call(
            editDevice,
            deviceId,
            deviceName,
            deviceType
        ); 
        yield* put(deviceUpdateSuccess(device));
    } catch (error) {
        yield* put(deviceCreateFailed(error as Error));
    }
}

export function* removeDevice({ payload: { deviceId }}: DeviceDeleteStart) {
    try {
        const devices = yield* call(
            deleteDevice,
            deviceId
        ); 
        yield* put(deviceDeleteSuccess(devices));
    } catch (error) {
        yield* put(deviceDeleteFailed(error as Error));
    }
}

export function* fetchUserDevices() {
    try {
        const device  = yield* call(getAllDevices);
        if (!device) return;
        yield* put(deviceFetchAllSuccess(device));
    } catch (error) {
        yield* put(deviceFetchAllFailed(error as Error));
    }
}

export function* fetchSingleDevice({ 
    payload: { deviceId } }: DeviceFetchSingleStart) {
    try {
        const devices = yield* call(
            getSingleDevice,
            deviceId 
        );
        yield* put(deviceFetchSingleSuccess(devices));
    } catch (error) {
        yield* put(deviceFetchSingleFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        DEVICE_ACTION_TYPES.CREATE_START, 
        createDevice
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        DEVICE_ACTION_TYPES.UPDATE_START, 
        updateDevice
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        DEVICE_ACTION_TYPES.DELETE_START, 
        removeDevice
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        DEVICE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleDevice
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        DEVICE_ACTION_TYPES.FETCH_ALL_START,
        fetchUserDevices
    );
}

export function* deviceSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
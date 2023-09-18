import { AnyAction } from 'redux';

import { Device } from './device.types';

import {
    deviceCreateFailed,
    deviceCreateSuccess,
    deviceDeleteFailed,
    deviceDeleteSuccess,
    deviceFetchAllFailed,
    deviceFetchAllStart,
    deviceFetchAllSuccess,
    deviceFetchSingleFailed,
    deviceFetchSingleSuccess,
    deviceUpdateFailed,
    deviceUpdateSuccess
} from './device.action';

export type DeviceState = {
    readonly deviceId: string | null;
    readonly singleDevice: Device | null;
    readonly userDevices: Device[];
    readonly devices: Device[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: DeviceState = {
    deviceId: null,
    singleDevice: null,
    userDevices: [],
    devices: [],
    isLoading: false,
    error: null,
};

export const deviceReducer = (
    state = INITIAL_STATE, action: AnyAction
): DeviceState => {
    if (
        deviceFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        deviceFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleDevice: action.payload }
    }
    if (
        deviceCreateSuccess.match(action) ||
        deviceUpdateSuccess.match(action) ||
        deviceDeleteSuccess.match(action) ||
        deviceFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, devices: action.payload };
    } 
    if (
        deviceCreateFailed.match(action) ||
        deviceUpdateFailed.match(action) ||
        deviceDeleteFailed.match(action) ||
        deviceFetchSingleFailed.match(action) ||
        deviceFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
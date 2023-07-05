import { DEVICE_ACTION_TYPES, Device } from './device.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type DeviceCreateStart = ActionWithPayload<
    DEVICE_ACTION_TYPES.CREATE_START, { deviceName: string, deviceType: number }
>;

export type DeviceCreateSuccess = ActionWithPayload<
    DEVICE_ACTION_TYPES.CREATE_SUCCESS, 
    Device[]
>;

export type DeviceCreateFailed = ActionWithPayload<
    DEVICE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type DeviceUpdateStart = ActionWithPayload<
    DEVICE_ACTION_TYPES.UPDATE_START,
    { deviceId: number, deviceName: string, deviceType: number }
>;

export type DeviceUpdateSuccess = ActionWithPayload<
    DEVICE_ACTION_TYPES.UPDATE_SUCCESS, 
    Device[]
>;

export type DeviceUpdateFailed = ActionWithPayload<
    DEVICE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type DeviceDeleteStart = ActionWithPayload<
    DEVICE_ACTION_TYPES.DELETE_START,
    { deviceId: number }
>;

export type DeviceDeleteSuccess = ActionWithPayload<
    DEVICE_ACTION_TYPES.DELETE_SUCCESS, 
    Device[]
>;

export type DeviceDeleteteFailed = ActionWithPayload<
    DEVICE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type DeviceFetchSingleStart = ActionWithPayload<
    DEVICE_ACTION_TYPES.FETCH_SINGLE_START,
    { deviceId: number }
>;

export type DeviceFetchSingleSuccess = ActionWithPayload<
    DEVICE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Device
>;

export type DeviceFetchSingleFailed = ActionWithPayload<
    DEVICE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type DeviceFetchAllStart = Action<
    DEVICE_ACTION_TYPES.FETCH_ALL_START
>;

export type DeviceFetchAllSuccess = ActionWithPayload<
    DEVICE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Device[]
>;

export type DeviceFetchAllFailed = ActionWithPayload<
    DEVICE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const deviceCreateStart = withMatcher(
    (deviceName: string, deviceType: number): DeviceCreateStart => 
    createAction(DEVICE_ACTION_TYPES.CREATE_START, { deviceName, deviceType })
);

export const deviceCreateSuccess = withMatcher(
    (device: Device[]): DeviceCreateSuccess => 
    createAction(DEVICE_ACTION_TYPES.CREATE_SUCCESS, device)
);

export const deviceCreateFailed = withMatcher(
    (error: Error) => 
    createAction(DEVICE_ACTION_TYPES.CREATE_START, error)
);
 
export const deviceUpdateStart = withMatcher(
    (deviceId: number, deviceName: string, deviceType: number): DeviceUpdateStart => 
    createAction(DEVICE_ACTION_TYPES.UPDATE_START, { deviceId, deviceName, deviceType })
);

export const deviceUpdateSuccess = withMatcher(
    (device: Device[]): DeviceUpdateSuccess => 
    createAction(DEVICE_ACTION_TYPES.UPDATE_SUCCESS, device)
);

export const deviceUpdateFailed = withMatcher(
    (error: Error): DeviceUpdateFailed => 
    createAction(DEVICE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const deviceDeleteStart = withMatcher(
    (deviceId: number): DeviceDeleteStart => 
    createAction(DEVICE_ACTION_TYPES.DELETE_START, { deviceId })
);

export const deviceDeleteSuccess = withMatcher(
    (device: Device[]): DeviceDeleteSuccess => 
    createAction(DEVICE_ACTION_TYPES.DELETE_SUCCESS, device)
);

export const deviceDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(DEVICE_ACTION_TYPES.DELETE_START, error)
);

export const deviceFetchSingleStart = withMatcher(
    (deviceId: number): DeviceFetchSingleStart => 
    createAction(DEVICE_ACTION_TYPES.FETCH_SINGLE_START, { deviceId })
);

export const deviceFetchSingleSuccess = withMatcher(
    (device: Device): DeviceFetchSingleSuccess => 
    createAction(DEVICE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, device)
);

export const deviceFetchSingleFailed = withMatcher(
    (error: Error): DeviceFetchSingleFailed => 
    createAction(DEVICE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const deviceFetchAllStart = withMatcher(
    (): DeviceFetchAllStart => 
    createAction(DEVICE_ACTION_TYPES.FETCH_ALL_START)
);

export const deviceFetchAllSuccess = withMatcher(
    (device: Device[]): DeviceFetchAllSuccess => 
    createAction(DEVICE_ACTION_TYPES.FETCH_ALL_SUCCESS, device)
);

export const deviceFetchAllFailed = withMatcher(
    (error: Error): DeviceFetchAllFailed => 
    createAction(DEVICE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
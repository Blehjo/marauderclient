import { Pin } from "../pin/pin.types";

export enum DEVICE_ACTION_TYPES {
    CREATE_START = 'device/CREATE_START',
    CREATE_SUCCESS = 'device/CREATE_SUCCESS',
    CREATE_FAILED = 'device/CREATE_FAILED',
    UPDATE_START = 'device/UPDATE_START',
    UPDATE_SUCCESS = 'device/UPDATE_SUCCESS',
    UPDATE_FAILED = 'device/UPDATE_FAILED',
    DELETE_START = 'device/DELETE_START',
    DELETE_SUCCESS = 'device/DELETE_SUCCESS',
    DELETE_FAILED = 'device/DELETE_FAILED',
    FETCH_SINGLE_START = 'device/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'device/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'device/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'device/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'device/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'device/FETCH_ALL_FAILED'
};

export type Device = {
    deviceId: number;
    deviceName: string | null;
    deviceType: number;
    pins: Pin[];
}
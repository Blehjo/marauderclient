import { Action } from "../action/action.types";

export enum PIN_ACTION_TYPES {
    CREATE_START = 'pin/CREATE_START',
    CREATE_SUCCESS = 'pin/CREATE_SUCCESS',
    CREATE_FAILED = 'pin/CREATE_FAILED',
    UPDATE_START = 'pin/UPDATE_START',
    UPDATE_SUCCESS = 'pin/UPDATE_SUCCESS',
    UPDATE_FAILED = 'pin/UPDATE_FAILED',
    DELETE_START = 'pin/DELETE_START',
    DELETE_SUCCESS = 'pin/DELETE_SUCCESS',
    DELETE_FAILED = 'pin/DELETE_FAILED',
    FETCH_ALL_START = 'pin/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'pin/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'pin/FETCH_ALL_FAILED',
};

export type Pin = {
    pinId: number | null;
    pinLocation: string | null;
    isAnalog: boolean;
    deviceId: number | null;
    actions: Action[];
}
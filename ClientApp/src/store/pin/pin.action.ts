import { PIN_ACTION_TYPES, Pin } from './pin.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type PinCreateStart = ActionWithPayload<
    PIN_ACTION_TYPES.CREATE_START, { pinLocation: string, isAnalog: boolean, deviceId: number }
>;

export type PinCreateSuccess = ActionWithPayload<
    PIN_ACTION_TYPES.CREATE_SUCCESS, 
    Pin[]
>;

export type PinCreateFailed = ActionWithPayload<
    PIN_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PinUpdateStart = ActionWithPayload<
    PIN_ACTION_TYPES.UPDATE_START,
    { pinId: number, pinLocation: string, isAnalog: boolean, deviceId: number }
>;

export type PinUpdateSuccess = ActionWithPayload<
    PIN_ACTION_TYPES.UPDATE_SUCCESS, 
    Pin[]
>;

export type PinUpdateFailed = ActionWithPayload<
    PIN_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PinDeleteStart = ActionWithPayload<
    PIN_ACTION_TYPES.DELETE_START,
    { pinId: number }
>;

export type PinDeleteSuccess = ActionWithPayload<
    PIN_ACTION_TYPES.DELETE_SUCCESS, 
    Pin[]
>;

export type PinDeleteteFailed = ActionWithPayload<
    PIN_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PinFetchSingleStart = ActionWithPayload<
    PIN_ACTION_TYPES.FETCH_SINGLE_START,
    { pinId: number }
>;

export type PinFetchSingleSuccess = ActionWithPayload<
    PIN_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Pin
>;

export type PinFetchSingleFailed = ActionWithPayload<
    PIN_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PinFetchAllStart = Action<
    PIN_ACTION_TYPES.FETCH_ALL_START
>;

export type PinFetchAllSuccess = ActionWithPayload<
    PIN_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Pin[]
>;

export type PinFetchAllFailed = ActionWithPayload<
    PIN_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const pinCreateStart = withMatcher(
    (pinLocation: string, isAnalog: boolean, deviceId: number ): PinCreateStart => 
    createAction(PIN_ACTION_TYPES.CREATE_START, { pinLocation, isAnalog, deviceId })
);

export const pinCreateSuccess = withMatcher(
    (pins: Pin[]): PinCreateSuccess => 
    createAction(PIN_ACTION_TYPES.CREATE_SUCCESS, pins)
);

export const pinCreateFailed = withMatcher(
    (error: Error) => 
    createAction(PIN_ACTION_TYPES.CREATE_START, error)
);
 
export const pinUpdateStart = withMatcher(
    (pinId: number, pinLocation: string, isAnalog: boolean, deviceId: number): PinUpdateStart => 
    createAction(PIN_ACTION_TYPES.UPDATE_START, { pinId, pinLocation, isAnalog, deviceId })
);

export const pinUpdateSuccess = withMatcher(
    (Pin: Pin[]): PinUpdateSuccess => 
    createAction(PIN_ACTION_TYPES.UPDATE_SUCCESS, Pin)
);

export const pinUpdateFailed = withMatcher(
    (error: Error): PinUpdateFailed => 
    createAction(PIN_ACTION_TYPES.UPDATE_FAILED, error)
);

export const pinDeleteStart = withMatcher(
    (pinId: number): PinDeleteStart => 
    createAction(PIN_ACTION_TYPES.DELETE_START, { pinId })
);

export const pinDeleteSuccess = withMatcher(
    (pins: Pin[]): PinDeleteSuccess => 
    createAction(PIN_ACTION_TYPES.DELETE_SUCCESS, pins)
);

export const pinDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(PIN_ACTION_TYPES.DELETE_START, error)
);

export const pinFetchSingleStart = withMatcher(
    (pinId: number): PinFetchSingleStart => 
    createAction(PIN_ACTION_TYPES.FETCH_SINGLE_START, { pinId })
);

export const pinFetchSingleSuccess = withMatcher(
    (pins: Pin): PinFetchSingleSuccess => 
    createAction(PIN_ACTION_TYPES.FETCH_SINGLE_SUCCESS, pins)
);

export const pinFetchSingleFailed = withMatcher(
    (error: Error): PinFetchSingleFailed => 
    createAction(PIN_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const pinFetchAllStart = withMatcher(
    (): PinFetchAllStart => 
    createAction(PIN_ACTION_TYPES.FETCH_ALL_START)
);

export const pinFetchAllSuccess = withMatcher(
    (pins: Pin[]): PinFetchAllSuccess => 
    createAction(PIN_ACTION_TYPES.FETCH_ALL_SUCCESS, pins)
);

export const pinFetchAllFailed = withMatcher(
    (error: Error): PinFetchAllFailed => 
    createAction(PIN_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
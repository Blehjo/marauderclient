import { AnyAction } from 'redux';

import { Pin } from './pin.types';

import {
    pinCreateFailed,
    pinCreateSuccess,
    pinDeleteFailed,
    pinDeleteSuccess,
    pinFetchAllFailed,
    pinFetchAllStart,
    pinFetchAllSuccess,
    pinFetchSingleFailed,
    pinFetchSingleSuccess,
    pinUpdateFailed,
    pinUpdateSuccess
} from './pin.action';

export type PinState = {
    readonly pinId: number | null;
    readonly singlePin: Pin | null;
    readonly userPins: Pin[];
    readonly pins: Pin[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: PinState = {
    pinId: null,
    singlePin: null,
    userPins: [],
    pins: [],
    isLoading: false,
    error: null,
};

export const pinReducer = (
    state = INITIAL_STATE, action: AnyAction
): PinState => {
    if (
        pinFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        pinFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singlePin: action.payload }
    }
    if (
        pinCreateSuccess.match(action) ||
        pinUpdateSuccess.match(action) ||
        pinDeleteSuccess.match(action) ||
        pinFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, pins: action.payload };
    } 
    if (
        pinCreateFailed.match(action) ||
        pinUpdateFailed.match(action) ||
        pinDeleteFailed.match(action) ||
        pinFetchSingleFailed.match(action) ||
        pinFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
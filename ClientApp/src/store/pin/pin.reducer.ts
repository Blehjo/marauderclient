import { AnyAction } from 'redux';

import { Pin } from './pin.types';

import {
    noteCreateFailed,
    noteCreateSuccess,
    noteDeleteFailed,
    noteDeleteSuccess,
    noteFetchAllFailed,
    noteFetchAllStart,
    noteFetchAllSuccess,
    noteFetchSingleFailed,
    noteFetchSingleSuccess,
    noteUpdateFailed,
    noteUpdateSuccess
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
        noteFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        noteFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, pins: action.payload }
    }
    if (
        noteCreateSuccess.match(action) ||
        noteUpdateSuccess.match(action) ||
        noteDeleteSuccess.match(action) ||
        noteFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, pins: action.payload };
    } 
    if (
        noteCreateFailed.match(action) ||
        noteUpdateFailed.match(action) ||
        noteDeleteFailed.match(action) ||
        noteFetchSingleFailed.match(action) ||
        noteFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
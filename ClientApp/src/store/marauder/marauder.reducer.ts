import { AnyAction } from 'redux';

import { Marauder } from './marauder.types';
import { marauderFetchAllFailed, marauderFetchAllStart, marauderFetchAllSuccess, marauderFetchSingleSuccess } from './marauder.action';

export type MarauderState = {
    readonly marauderId: number | null;
    readonly singleMarauder: Marauder | null;
    readonly marauders: Marauder[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: MarauderState = {
    marauderId: null,
    singleMarauder: null,
    marauders: [],
    isLoading: false,
    error: null,
};

export const marauderReducer = (
    state = INITIAL_STATE, action: AnyAction
): MarauderState => {
    if (
        marauderFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        marauderFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleMarauder: action.payload };
    } 
    if (
        marauderFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, marauders: action.payload };
    } 
    if (
        marauderFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
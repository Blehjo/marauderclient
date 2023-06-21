import { AnyAction } from 'redux';

import { Pilot } from './pilot.types';

import {
    pilotFetchSingleStart,
    pilotFetchSingleSuccess,
    pilotFetchSingleFailed,
    pilotFetchAllStart,
    pilotFetchAllSuccess,
    pilotFetchAllFailed,
} from './pilot.action';

export type PilotState = {
    readonly pilotId: number | null;
    readonly singlePilot: Pilot | null;
    readonly pilots: Pilot[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: PilotState = {
    pilotId: null,
    singlePilot: null,
    pilots: [],
    isLoading: false,
    error: null,
};

export const pilotReducer = (
    state = INITIAL_STATE, action: AnyAction
): PilotState => {
    if (
        pilotFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        pilotFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singlePilot: action.payload };
    } 
    if (
        pilotFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, pilots: action.payload };
    } 
    if (
        pilotFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
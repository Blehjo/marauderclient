import { PILOT_ACTION_TYPES, Pilot } from './pilot.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';
   
export type PilotFetchSingleStart = ActionWithPayload<
    PILOT_ACTION_TYPES.FETCH_SINGLE_START,
    { userId: number }
>;

export type PilotFetchSingleSuccess = ActionWithPayload<
    PILOT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Pilot
>;

export type PilotFetchSingleFailed = ActionWithPayload<
    PILOT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PilotFetchAllStart = Action<
    PILOT_ACTION_TYPES.FETCH_ALL_START
>;

export type PilotFetchAllSuccess = ActionWithPayload<
    PILOT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Pilot[]
>;

export type PilotFetchAllFailed = ActionWithPayload<
    PILOT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const pilotFetchSingleStart = withMatcher(
    (userId: number): PilotFetchSingleStart => 
    createAction(PILOT_ACTION_TYPES.FETCH_SINGLE_START, { userId })
);

export const pilotFetchSingleSuccess = withMatcher(
    (pilot: Pilot): PilotFetchSingleSuccess => 
    createAction(PILOT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, pilot)
);

export const pilotFetchSingleFailed = withMatcher(
    (error: Error): PilotFetchSingleFailed => 
    createAction(PILOT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const pilotFetchAllStart = withMatcher(
    (): PilotFetchAllStart => 
    createAction(PILOT_ACTION_TYPES.FETCH_ALL_START)
);

export const pilotFetchAllSuccess = withMatcher(
    (pilots: Pilot[]): PilotFetchAllSuccess => 
    createAction(PILOT_ACTION_TYPES.FETCH_ALL_SUCCESS, pilots)
);

export const pilotFetchAllFailed = withMatcher(
    (error: Error): PilotFetchAllFailed => 
    createAction(PILOT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
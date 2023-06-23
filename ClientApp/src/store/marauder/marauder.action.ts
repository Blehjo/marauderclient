import { MARAUDER_ACTION_TYPES, Marauder } from './marauder.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
   
export type MarauderFetchSingleStart = ActionWithPayload<
    MARAUDER_ACTION_TYPES.FETCH_SINGLE_START,
    { userId: number }
>;

export type MarauderFetchSingleSuccess = ActionWithPayload<
    MARAUDER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Marauder
>;

export type MarauderFetchSingleFailed = ActionWithPayload<
    MARAUDER_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MarauderFetchAllStart = Action<
    MARAUDER_ACTION_TYPES.FETCH_ALL_START
>;

export type MarauderFetchAllSuccess = ActionWithPayload<
    MARAUDER_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Marauder[]
>;

export type MarauderFetchAllFailed = ActionWithPayload<
    MARAUDER_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const marauderFetchSingleStart = withMatcher(
    (userId: number): MarauderFetchSingleStart => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_SINGLE_START, { userId })
);

export const marauderFetchSingleSuccess = withMatcher(
    (marauder: Marauder): MarauderFetchSingleSuccess => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, marauder)
);

export const marauderFetchSingleFailed = withMatcher(
    (error: Error): MarauderFetchSingleFailed => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const marauderFetchAllStart = withMatcher(
    (): MarauderFetchAllStart => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_ALL_START)
);

export const marauderFetchAllSuccess = withMatcher(
    (marauders: Marauder[]): MarauderFetchAllSuccess => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_ALL_SUCCESS, marauders)
);

export const marauderFetchAllFailed = withMatcher(
    (error: Error): MarauderFetchAllFailed => 
    createAction(MARAUDER_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
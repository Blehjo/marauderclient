import { ACTION_TYPES, Action as Act } from './action.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type ActionCreateStart = ActionWithPayload<
    ACTION_TYPES.CREATE_START, { 
        eventType: string, 
        activity: string, 
        pinId: number 
    }
>;

export type ActionCreateSuccess = ActionWithPayload<
    ACTION_TYPES.CREATE_SUCCESS, 
    Act[]
>;

export type ActionCreateFailed = ActionWithPayload<
    ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ActionUpdateStart = ActionWithPayload<
    ACTION_TYPES.UPDATE_START,
    { 
        actionId: number,
        eventType: string, 
        activity: string, 
        pinId: number 
    }
>;

export type ActionUpdateSuccess = ActionWithPayload<
    ACTION_TYPES.UPDATE_SUCCESS, 
    Act[]
>;

export type ActionUpdateFailed = ActionWithPayload<
    ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ActionDeleteStart = ActionWithPayload<
    ACTION_TYPES.DELETE_START,
    { actionId: number }
>;

export type ActionDeleteSuccess = ActionWithPayload<
    ACTION_TYPES.DELETE_SUCCESS, 
    Act[]
>;

export type ActionDeleteteFailed = ActionWithPayload<
    ACTION_TYPES.DELETE_FAILED,
    Error
>;

export type ActionFetchSingleStart = ActionWithPayload<
    ACTION_TYPES.FETCH_SINGLE_START,
    { actionId: number }
>;

export type ActionFetchSingleSuccess = ActionWithPayload<
    ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Act
>;

export type ActionFetchSingleFailed = ActionWithPayload<
    ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ActionFetchAllStart = Action<
    ACTION_TYPES.FETCH_ALL_START
>;

export type ActionFetchAllSuccess = ActionWithPayload<
    ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Act[]
>;

export type ActionFetchAllFailed = ActionWithPayload<
    ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const actionCreateStart = withMatcher(
    (eventType: string, activity: string, pinId: number ): ActionCreateStart => 
    createAction(ACTION_TYPES.CREATE_START, { eventType, activity, pinId })
);

export const actionCreateSuccess = withMatcher(
    (action: Act[]): ActionCreateSuccess => 
    createAction(ACTION_TYPES.CREATE_SUCCESS, action)
);

export const actionCreateFailed = withMatcher(
    (error: Error) => 
    createAction(ACTION_TYPES.CREATE_START, error)
);
 
export const actionUpdateStart = withMatcher(
    (actionId: number, eventType: string, activity: string, pinId: number): ActionUpdateStart => 
    createAction(ACTION_TYPES.UPDATE_START, { actionId, eventType, activity, pinId })
);

export const actionUpdateSuccess = withMatcher(
    (action: Act[]): ActionUpdateSuccess => 
    createAction(ACTION_TYPES.UPDATE_SUCCESS, action)
);

export const actionUpdateFailed = withMatcher(
    (error: Error): ActionUpdateFailed => 
    createAction(ACTION_TYPES.UPDATE_FAILED, error)
);

export const actionDeleteStart = withMatcher(
    (actionId: number): ActionDeleteStart => 
    createAction(ACTION_TYPES.DELETE_START, { actionId })
);

export const actionDeleteSuccess = withMatcher(
    (action: Act[]): ActionDeleteSuccess => 
    createAction(ACTION_TYPES.DELETE_SUCCESS, action)
);

export const actionDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(ACTION_TYPES.DELETE_START, error)
);

export const actionFetchSingleStart = withMatcher(
    (actionId: number): ActionFetchSingleStart => 
    createAction(ACTION_TYPES.FETCH_SINGLE_START, { actionId })
);

export const actionFetchSingleSuccess = withMatcher(
    (action: Act): ActionFetchSingleSuccess => 
    createAction(ACTION_TYPES.FETCH_SINGLE_SUCCESS, action)
);

export const actionFetchSingleFailed = withMatcher(
    (error: Error): ActionFetchSingleFailed => 
    createAction(ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const actionFetchAllStart = withMatcher(
    (action: Act[]): ActionFetchAllStart => 
    createAction(ACTION_TYPES.FETCH_ALL_START, action)
);

export const actionFetchAllSuccess = withMatcher(
    (action: Act[]): ActionFetchAllSuccess => 
    createAction(ACTION_TYPES.FETCH_ALL_SUCCESS, action)
);

export const actionFetchAllFailed = withMatcher(
    (error: Error): ActionFetchAllFailed => 
    createAction(ACTION_TYPES.FETCH_ALL_FAILED, error)
);
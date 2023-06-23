import { AnyAction } from 'redux';

import { Action } from './action.types';

import {
    actionCreateFailed,
    actionCreateSuccess,
    actionDeleteFailed,
    actionDeleteSuccess,
    actionFetchAllFailed,
    actionFetchAllStart,
    actionFetchAllSuccess,
    actionFetchSingleFailed,
    actionFetchSingleSuccess,
    actionUpdateFailed,
    actionUpdateSuccess
} from './action.action';

export type ActionState = {
    readonly actionId: number | null;
    readonly singleAction: Action | null;
    readonly userActions: Action[];
    readonly actions: Action[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: ActionState = {
    actionId: null,
    singleAction: null,
    userActions: [],
    actions: [],
    isLoading: false,
    error: null,
};

export const actionReducer = (
    state = INITIAL_STATE, action: AnyAction
): ActionState => {
    if (
        actionFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        actionFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, actions: action.payload }
    }
    if (
        actionCreateSuccess.match(action) ||
        actionUpdateSuccess.match(action) ||
        actionDeleteSuccess.match(action) ||
        actionFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, actions: action.payload };
    } 
    if (
        actionCreateFailed.match(action) ||
        actionUpdateFailed.match(action) ||
        actionDeleteFailed.match(action) ||
        actionFetchSingleFailed.match(action) ||
        actionFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
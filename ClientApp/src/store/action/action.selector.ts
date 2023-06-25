import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ActionState } from './action.reducer';

export const selectActionReducer = (state: RootState): ActionState => state.action;

export const selectActionId = createSelector(
    [selectActionReducer],
    (action) => action.actionId
);

export const selectSingleAction = createSelector(
    [selectActionReducer],
    (action) => action.singleAction
)

export const selectUserActions = createSelector(
    [selectActionReducer],
    (action) => action.userActions
);

export const selectAllActions = createSelector(
    [selectActionReducer],
    (action) => action.actions
);

export const selectIsActionLoading = createSelector(
    [selectActionReducer],
    (action) => action.isLoading
);
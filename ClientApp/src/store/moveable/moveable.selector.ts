import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MoveableState } from './moveable.reducer';

export const selectMoveableReducer = (state: RootState): MoveableState => state.moveable;

export const selectIsMoveableLoading = createSelector(
    [selectMoveableReducer],
    (moveable) => moveable.isLoading
);

export const selectMoveableId = createSelector(
    [selectMoveableReducer],
    (moveable) => moveable.moveableId
);

export const selectSingleMoveable = createSelector(
    [selectMoveableReducer],
    (moveable) => moveable.singleMoveable
);

export const selectUserMoveables = createSelector(
    [selectMoveableReducer],
    (moveable) => moveable.userMoveables
);

export const selectAllMoveables = createSelector(
    [selectMoveableReducer],
    (moveable) => moveable.moveables
);
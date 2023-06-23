import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MarauderState } from './marauder.reducer';

export const selectMarauderReducer = (state: RootState): MarauderState => state.marauder;

export const selectMarauderId = createSelector(
    [selectMarauderReducer],
    (marauder) => marauder.marauderId
);

export const selectSingleMarauder = createSelector(
    [selectMarauderReducer],
    (marauder) => marauder.singleMarauder
);

export const selectAllMarauders = createSelector(
    [selectMarauderReducer],
    (marauder) => marauder.marauders
);
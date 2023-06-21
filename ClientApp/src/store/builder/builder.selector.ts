import { createSelector } from 'reselect';

import { RootState } from '../store';
import { BuilderState } from './builder.reducer';

export const selectBuilderReducer = (state: RootState): BuilderState => state.builder;

export const selectBuilderMode = createSelector(
    [selectBuilderReducer],
    (builder) => builder.mode
);

export const selectbuilderColor = createSelector(
    [selectBuilderReducer],
    (builder) => builder.color
);

export const selectbuilderIsGridVisible = createSelector(
    [selectBuilderReducer],
    (builder) => builder.grid
);

export const selectBuilderBrickDimensions = createSelector(
    [selectBuilderReducer],
    (builder) => builder.brick
);
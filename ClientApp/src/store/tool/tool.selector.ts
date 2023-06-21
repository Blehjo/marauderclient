import { createSelector } from 'reselect';

import { RootState } from '../store';

import { ToolState } from './tool.reducer';

const selectToolReducer = (state: RootState): ToolState => state.tool;

export const selectIsToolOpen = createSelector(
  [selectToolReducer],
  (tool) => tool.isToolOpen
);
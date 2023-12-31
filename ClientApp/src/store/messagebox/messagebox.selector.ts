﻿import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MessageBoxState } from './messagebox.reducer';

const selectMessageboxReducer = (state: RootState): MessageBoxState => state.messagebox;

export const selectIsArtificialIntelligenceOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isArtificialIntelligenceOpen
);

export const selectIsDevicesOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isDevicesOpen
);

export const selectIsPostOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isPostOpen
);

export const selectIsSolarSystemsOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isSolarSystemOpen
);

export const selectIsPlantesOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isBuilderOpen
);

export const selectIsMoonsOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isEditorOpen
);

export const selectIsMaraudersOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isMaraudersOpen
);

export const selectIsMessagesOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isMessagesOpen
);
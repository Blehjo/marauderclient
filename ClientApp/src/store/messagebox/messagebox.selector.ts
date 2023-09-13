import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MessageBoxState } from './messagebox.reducer';

const selectMessageboxReducer = (state: RootState): MessageBoxState => state.messagebox;

export const selectIsArtificialIntelligenceOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isArtificialIntelligenceOpen
);

export const selectIsVitalsOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isVitalsOpen
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
    (messagebox) => messagebox.isPlanetsOpen
);

export const selectIsMoonsOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isMoonsOpen
);

export const selectIsMaraudersOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isMaraudersOpen
);

export const selectIsMessagesOpen = createSelector(
    [selectMessageboxReducer],
    (messagebox) => messagebox.isMessagesOpen
);
import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ToolboxState } from './toolbox.reducer';

const selectToolboxReducer = (state: RootState): ToolboxState => state.toolbox;

export const selectIsArtificialIntelligenceOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isArtificialIntelligenceOpen
);

export const selectIsVitalsOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isVitalsOpen
);

export const selectIsPostOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isPostOpen
);

export const selectIsSolarSystemsOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isSolarSystemOpen
);

export const selectIsPlantesOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isPlanetsOpen
);

export const selectIsMoonsOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isMoonsOpen
);

export const selectIsMaraudersOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.IsMaraudersOpen
);

export const selectIsMessagesOpen = createSelector(
    [selectToolboxReducer],
    (toolbox) => toolbox.isMessagesOpen
);
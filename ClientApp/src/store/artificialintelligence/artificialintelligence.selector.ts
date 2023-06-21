import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ArtificialIntelligenceState } from './artificialintelligence.reducer';

export const selectArtificialIntelligenceReducer = (state: RootState): ArtificialIntelligenceState => state.artificialIntelligence;

export const selectArtificialIntelligenceItems = createSelector(
    [selectArtificialIntelligenceReducer],
    (artificialintelligence) => artificialintelligence.artificialIntelligences
);

export const selectArtificialIntelligenceId = createSelector(
    [selectArtificialIntelligenceReducer],
    (artificialintelligence) => artificialintelligence.artificialIntelligenceId
);

export const selectArtificialIntelligencepost = createSelector(
    [selectArtificialIntelligenceReducer],
    (artificialintelligence) => artificialintelligence.singleArtificialIntelligence
);

export const selectUserArtificialIntelligence = createSelector(
    [selectArtificialIntelligenceReducer],
    (artificialintelligence) => artificialintelligence.userArtificialIntelligences
);

export const selectAllArtificialIntelligence = createSelector(
    [selectArtificialIntelligenceReducer],
    (artificialintelligence) => artificialintelligence.artificialIntelligences
);
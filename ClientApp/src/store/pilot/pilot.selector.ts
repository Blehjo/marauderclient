import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PilotState } from './pilot.reducer';

export const selectPilotReducer = (state: RootState): PilotState => state.pilot;

export const selectPilotId = createSelector(
    [selectPilotReducer],
    (pilot) => pilot.pilotId
);

export const selectSinglePilot = createSelector(
    [selectPilotReducer],
    (pilot) => pilot.singlePilot
);

export const selectAllPilots = createSelector(
    [selectPilotReducer],
    (pilot) => pilot.pilots
);
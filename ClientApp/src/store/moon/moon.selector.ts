import { createSelector } from 'reselect';

import { RootState } from '../store';

import { MoonState } from './moon.reducer';

export const selectMoonReducer = (state: RootState): MoonState => state.moon;

export const selectIsMoonLoading = createSelector(
  [selectMoonReducer],
  (moon) => moon.isLoading
);

export const selectMoonId = createSelector(
  [selectMoonReducer],
  (moon) => moon.moonId
);

export const selectSingleMoon = createSelector(
  [selectMoonReducer],
  (moon) => moon.singleMoon
);

export const selectUserMoons = createSelector(
  [selectMoonReducer],
  (moon) => moon.userMoons
);

export const selectAllMoons = createSelector(
  [selectMoonReducer],
  (moon) => moon.moons
);
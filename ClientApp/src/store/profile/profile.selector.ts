import { createSelector } from 'reselect';

import { RootState } from '../store';

import { ProfileState } from './profile.reducer';

const selectProfileReducer = (state: RootState): ProfileState => state.profile;

export const selectIsProfileOpen = createSelector(
  [selectProfileReducer],
  (profile) => profile.isProfileOpen
);
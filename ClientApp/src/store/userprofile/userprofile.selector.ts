import { createSelector } from 'reselect';

import { RootState } from '../store';
import { UserprofileState } from './userprofile.reducer';

export const selectUserprofileReducer = (state: RootState): UserprofileState => state.userprofile;

export const selectUserprofile = createSelector(
    [selectUserprofileReducer],
    (userprofile) => userprofile.userprofile
);

export const selectUserprofileId = createSelector(
    [selectUserprofileReducer],
    (userprofile) => userprofile.userprofileId
);

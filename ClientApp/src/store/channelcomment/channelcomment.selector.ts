import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PlanetCommentState } from './channelcomment.reducer';

export const selectPlanetCommentReducer = (state: RootState): PlanetCommentState => state.planetcomment;

export const selectIsPlanetCommentLoading = createSelector(
    [selectPlanetCommentReducer],
    (planetcomment) => planetcomment.isLoading
);

export const selectPlanetCommentId = createSelector(
    [selectPlanetCommentReducer],
    (planetcomment) => planetcomment.planetCommentId
);

export const selectSinglePlanetComment = createSelector(
    [selectPlanetCommentReducer],
    (planetcomment) => planetcomment.singleComment
);

export const selectUserPlanetComments = createSelector(
    [selectPlanetCommentReducer],
    (planetcomment) => planetcomment.userComments
);

export const selectAllPlanetComments = createSelector(
    [selectPlanetCommentReducer],
    (planetcomment) => planetcomment.comments
);
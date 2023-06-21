import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MoonCommentState } from './mooncomment.reducer';

export const selectMoonCommentReducer = (state: RootState): MoonCommentState => state.mooncomment;

export const selectIsMoonCommentLoading = createSelector(
    [selectMoonCommentReducer],
    (mooncomment) => mooncomment.isLoading
);

export const selectMoonCommentId = createSelector(
    [selectMoonCommentReducer],
    (mooncomment) => mooncomment.moonCommentId
);

export const selectMoonSingleComment = createSelector(
    [selectMoonCommentReducer],
    (mooncomment) => mooncomment.singleComment
);

export const selectUserMoonComments = createSelector(
    [selectMoonCommentReducer],
    (mooncomment) => mooncomment.userComments
);

export const selectAllMoonComments = createSelector(
    [selectMoonCommentReducer],
    (mooncomment) => mooncomment.mooncomments
);
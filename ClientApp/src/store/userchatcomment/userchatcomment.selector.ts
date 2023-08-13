import { createSelector } from 'reselect';

import { RootState } from '../store';
import { UserChatCommentState } from './userchatcomment.reducer';

export const selectCommentReducer = (state: RootState): UserChatCommentState => state.userchatcomment;

export const selectCommentId = createSelector(
    [selectCommentReducer],
    (comment) => comment.userChatCommentId
);

export const selectSingleComment = createSelector(
    [selectCommentReducer],
    (comment) => comment.singleComment
);

export const selectUserComments = createSelector(
    [selectCommentReducer],
    (comment) => comment.userComments
);

export const selectAllComments = createSelector(
    [selectCommentReducer],
    (comment) => comment.comments
);
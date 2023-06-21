import { createSelector } from 'reselect';

import { RootState } from '../store';
import { CommentState } from './comment.reducer';

export const selectCommentReducer = (state: RootState): CommentState => state.comment;

export const selectCommentId = createSelector(
    [selectCommentReducer],
    (comment) => comment.commentId
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
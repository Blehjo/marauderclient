import { createSelector } from 'reselect';

import { RootState } from '../store';
import { CommunityCommentState } from './communitycomment.reducer';

export const selectCommentReducer = (state: RootState): CommunityCommentState => state.communityComment;

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
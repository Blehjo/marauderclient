import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MessageCommentState } from './messagecomment.reducer';

export const selectMessagecommentReducer = (state: RootState): MessageCommentState => state.messagecomment;

export const selectMessageCommentItems = createSelector(
    [selectMessagecommentReducer],
    (messagecomment) => messagecomment.messagecomments
);

export const selectMessageCommentId = createSelector(
    [selectMessagecommentReducer],
    (messagecomment) => messagecomment.messagecommentId
);

export const selectSingleMessage = createSelector(
    [selectMessagecommentReducer],
    (messagecomment) => messagecomment.singleMessagecomment
);

export const selectUserMessages = createSelector(
    [selectMessagecommentReducer],
    (messagecomment) => messagecomment.userMessagecomments
);

export const selectAllMessages = createSelector(
    [selectMessagecommentReducer],
    (messagecomment) => messagecomment.messagecomments
);
import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ChatCommentState } from './chatcomment.reducer';

export const selectChatcommentReducer = (state: RootState): ChatCommentState => state.chatcomment;

export const selectIsChatCommentLoading = createSelector(
    [selectChatcommentReducer],
    (chatcomment) => chatcomment.isLoading
)
export const selectChatcommentId = createSelector(
    [selectChatcommentReducer],
    (chatcomment) => chatcomment.chatcommentId
);

export const selectSingleChatcomment = createSelector(
    [selectChatcommentReducer],
    (chatcomment) => chatcomment.singleChatcomment
);

export const selectUserChatcomments = createSelector(
    [selectChatcommentReducer],
    (chatcomment) => chatcomment.userChatcomments
);

export const selectAllChatcomments = createSelector(
    [selectChatcommentReducer],
    (chatcomment) => chatcomment.chatcomments
);
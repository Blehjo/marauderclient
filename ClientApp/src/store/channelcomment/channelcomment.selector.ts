import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ChannelCommentState } from './channelcomment.reducer';

export const selectChannelComentReducer = (state: RootState): ChannelCommentState => state.channelcomment;

export const selectIsChannelCommentLoading = createSelector(
    [selectChannelComentReducer],
    (channelcomment) => channelcomment.isLoading
);

export const selectChannelCommentId = createSelector(
    [selectChannelComentReducer],
    (channelcomment) => channelcomment.channelCommentId
);

export const selectSingleChannelComment = createSelector(
    [selectChannelComentReducer],
    (channelcomment) => channelcomment.singleComment
);

export const selectUserChannelComments = createSelector(
    [selectChannelComentReducer],
    (channelcomment) => channelcomment.userComments
);

export const selectAllChannelComments = createSelector(
    [selectChannelComentReducer],
    (channelcomment) => channelcomment.comments
);
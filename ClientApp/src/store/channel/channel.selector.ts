import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ChannelState } from './channel.reducer';

export const selectChannelReducer = (state: RootState): ChannelState => state.channel;

export const selectChannelId = createSelector(
    [selectChannelReducer],
    (channel) => channel.channelId
);

export const selectSingleChannel = createSelector(
    [selectChannelReducer],
    (channel) => channel.singleChannel
);

export const selectAllchannels = createSelector(
    [selectChannelReducer],
    (channel) => channel.channels
);

export const selectIsChannelLoading = createSelector(
    [selectChannelReducer],
    (channel) => channel.isLoading
);
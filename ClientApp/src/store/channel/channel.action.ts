import { CHANNEL_ACTION_TYPES, Channel } from './channel.types';

import {
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type ChannelCreateStart = ActionWithPayload<
    CHANNEL_ACTION_TYPES.CREATE_START, { description: string, communityId: number }
>;

export type ChannelCreateSuccess = ActionWithPayload<
    CHANNEL_ACTION_TYPES.CREATE_SUCCESS, 
    Channel[]
>;

export type ChannelCreateFailed = ActionWithPayload<
    CHANNEL_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ChannelUpdateStart = ActionWithPayload<
    CHANNEL_ACTION_TYPES.UPDATE_START,
    { channelId: number, description: string }
>;

export type ChannelUpdateSuccess = ActionWithPayload<
    CHANNEL_ACTION_TYPES.UPDATE_SUCCESS, 
    Channel[]
>;

export type ChannelUpdateFailed = ActionWithPayload<
    CHANNEL_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ChannelDeleteStart = ActionWithPayload<
    CHANNEL_ACTION_TYPES.DELETE_START,
    { channelId: number }
>;

export type ChannelDeleteSuccess = ActionWithPayload<
    CHANNEL_ACTION_TYPES.DELETE_SUCCESS, 
    Channel[]
>;

export type ChannelDeleteteFailed = ActionWithPayload<
    CHANNEL_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ChannelFetchSingleStart = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_SINGLE_START,
    { channelId: number }
>;

export type ChannelFetchSingleSuccess = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Channel
>;

export type ChannelFetchSingleFailed = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ChannelFetchAllStart = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_ALL_START, { communityId: number }
>;

export type ChannelFetchAllSuccess = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Channel[]
>;

export type ChannelFetchAllFailed = ActionWithPayload<
    CHANNEL_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const channelCreateStart = withMatcher(
    (description: string, communityId: number ): ChannelCreateStart => 
    createAction(CHANNEL_ACTION_TYPES.CREATE_START, { description, communityId })
);

export const channelCreateSuccess = withMatcher(
    (channel: Channel[]): ChannelCreateSuccess => 
    createAction(CHANNEL_ACTION_TYPES.CREATE_SUCCESS, channel)
);

export const channelCreateFailed = withMatcher(
    (error: Error) => 
    createAction(CHANNEL_ACTION_TYPES.CREATE_FAILED, error)
);
 
export const channelUpdateStart = withMatcher(
    (channelId: number, description: string): ChannelUpdateStart => 
    createAction(CHANNEL_ACTION_TYPES.UPDATE_START, { channelId, description })
);

export const channelUpdateSuccess = withMatcher(
    (channel: Channel[]): ChannelUpdateSuccess => 
    createAction(CHANNEL_ACTION_TYPES.UPDATE_SUCCESS, channel)
);

export const channelUpdateFailed = withMatcher(
    (error: Error): ChannelUpdateFailed => 
    createAction(CHANNEL_ACTION_TYPES.UPDATE_FAILED, error)
);

export const channelDeleteStart = withMatcher(
    (channelId: number): ChannelDeleteStart => 
    createAction(CHANNEL_ACTION_TYPES.DELETE_START, { channelId })
);

export const channelDeleteSuccess = withMatcher(
    (channel: Channel[]): ChannelDeleteSuccess => 
    createAction(CHANNEL_ACTION_TYPES.DELETE_SUCCESS, channel)
);

export const channelDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(CHANNEL_ACTION_TYPES.DELETE_START, error)
);

export const channelFetchSingleStart = withMatcher(
    (channelId: number): ChannelFetchSingleStart => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_SINGLE_START, { channelId })
);

export const channelFetchSingleSuccess = withMatcher(
    (channel: Channel): ChannelFetchSingleSuccess => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_SINGLE_SUCCESS, channel)
);

export const channelFetchSingleFailed = withMatcher(
    (error: Error): ChannelFetchSingleFailed => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const channelFetchAllStart = withMatcher(
    (communityId: number): ChannelFetchAllStart => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_ALL_START, { communityId })
);

export const channelFetchAllSuccess = withMatcher(
    (channel: Channel[]): ChannelFetchAllSuccess => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_ALL_SUCCESS, channel)
);

export const channelFetchAllFailed = withMatcher(
    (error: Error): ChannelFetchAllFailed => 
    createAction(CHANNEL_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
import { CHANNEL_COMMENT_ACTION_TYPES, ChannelComment } from './channelcomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type ChannelCommentCreateStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, channelId: number, imageFile: File }
>;

export type ChannelCommentCreateSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    ChannelComment[]
>;

export type ChannelCommentCreateFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ChannelCommentUpdateStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.UPDATE_START,
    { channelCommentId: number, commentValue: string, imageFile: File }
>;

export type ChannelCommentUpdateSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    ChannelComment[]
>;

export type ChannelCommentUpdateFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ChannelCommentDeleteStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.DELETE_START,
    { commentId: number }
>;

export type ChannelCommentDeleteSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    ChannelComment[]
>;

export type ChannelCommentDeleteteFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ChannelCommentFetchSingleStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { channelId: number }
>;

export type ChannelCommentFetchSingleSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    ChannelComment[]
>;

export type ChannelCommentFetchSingleFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ChannelCommentFetchAllStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_START, {
        channelId: number
    }
>;

export type ChannelCommentFetchAllSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    ChannelComment[]
>;

export type ChannelCommentFetchAllFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type ChannelCommentSetIdStart = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.SET_ID_START, {
        channelCommentId: number
    }
>;

export type ChannelCommentSetIdSuccess = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.SET_ID_SUCCESS, 
    { channelCommentId: number }
>;

export type ChannelCommentSetIdFailed = ActionWithPayload<
    CHANNEL_COMMENT_ACTION_TYPES.SET_ID_FAILED,
    Error
>;

export const channelcommentCreateStart = withMatcher(
    (commentValue: string, channelId: number, imageFile: File): ChannelCommentCreateStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.CREATE_START, { commentValue, channelId, imageFile })
);

export const channelcommentCreateSuccess = withMatcher(
    (comment: ChannelComment[]): ChannelCommentCreateSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.CREATE_SUCCESS, comment)
);

export const channelcommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const channelcommentUpdateStart = withMatcher(
    (channelCommentId: number, commentValue: string, imageFile: File): ChannelCommentUpdateStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.UPDATE_START, { channelCommentId, commentValue, imageFile })
);

export const channelcommentUpdateSuccess = withMatcher(
    (comment: ChannelComment[]): ChannelCommentUpdateSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const channelcommentUpdateFailed = withMatcher(
    (error: Error): ChannelCommentUpdateFailed => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const channelcommentDeleteStart = withMatcher(
    (commentId: number): ChannelCommentDeleteStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.DELETE_START, { commentId })
);

export const channelcommentDeleteSuccess = withMatcher(
    (comment: ChannelComment[]): ChannelCommentDeleteSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const channelcommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const channelcommentFetchSingleStart = withMatcher(
    (channelId: number): ChannelCommentFetchSingleStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { channelId })
);

export const channelcommentFetchSingleSuccess = withMatcher(
    (comment: ChannelComment[]): ChannelCommentFetchSingleSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, comment)
);

export const channelcommentFetchSingleFailed = withMatcher(
    (error: Error): ChannelCommentFetchSingleFailed => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const channelcommentFetchAllStart = withMatcher(
    (channelId: number): ChannelCommentFetchAllStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_START, { channelId })
);

export const channelcommentFetchAllSuccess = withMatcher(
    (comment: ChannelComment[]): ChannelCommentFetchAllSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const channelcommentFetchAllFailed = withMatcher(
    (error: Error): ChannelCommentFetchAllFailed => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const channelcommentSetIdStart = withMatcher(
    (channelCommentId: number): ChannelCommentSetIdStart => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.SET_ID_START, { channelCommentId })
);

export const channelcommentSetIdSuccess = withMatcher(
    (channelCommentId: number): ChannelCommentSetIdSuccess => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.SET_ID_SUCCESS, { channelCommentId })
);

export const channelcommentSetIdFailed = withMatcher(
    (error: Error): ChannelCommentSetIdFailed => 
    createAction(CHANNEL_COMMENT_ACTION_TYPES.SET_ID_FAILED, error)
);
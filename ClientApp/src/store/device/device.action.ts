import { MOON_COMMENT_ACTION_TYPES, MoonComment } from './device.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type MoonCommentCreateStart = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, moonId: number }
>;

export type MoonCommentCreateSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentCreateFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MoonCommentUpdateStart = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.UPDATE_START,
    { moonCommentId: number, commentValue: string, mediaLink: string }
>;

export type MoonCommentUpdateSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentUpdateFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MoonCommentDeleteStart = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.DELETE_START,
    { moonCommentId: number }
>;

export type MoonCommentDeleteSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentDeleteteFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MoonCommentFetchSingleStart = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { moonCommentId: number }
>;

export type MoonCommentFetchSingleSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentFetchSingleFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MoonCommentFetchUserChatsStart = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START,
    { userId: number }
>;

export type MoonCommentFetchUserChatsSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentFetchUserChatsFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED,
    Error
>;

export type MoonCommentFetchAllStart = Action<
    MOON_COMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type MoonCommentFetchAllSuccess = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    MoonComment[]
>;

export type MoonCommentFetchAllFailed = ActionWithPayload<
    MOON_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const moonCommentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, moonId: number ): MoonCommentCreateStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, moonId })
);

export const moonCommentCreateSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentCreateSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.CREATE_SUCCESS, mooncomment)
);

export const moonCommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const moonCommentUpdateStart = withMatcher(
    (moonCommentId: number, commentValue: string, mediaLink: string, userId: number): MoonCommentUpdateStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.UPDATE_START, { moonCommentId, commentValue, mediaLink, userId })
);

export const moonCommentUpdateSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentUpdateSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, mooncomment)
);

export const moonCommentUpdateFailed = withMatcher(
    (error: Error): MoonCommentUpdateFailed => 
    createAction(MOON_COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const moonCommentDeleteStart = withMatcher(
    (moonCommentId: number): MoonCommentDeleteStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.DELETE_START, { moonCommentId })
);

export const moonCommentDeleteSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentDeleteSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.DELETE_SUCCESS, mooncomment)
);

export const moonCommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const moonCommentFetchSingleStart = withMatcher(
    (moonCommentId: number): MoonCommentFetchSingleStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { moonCommentId })
);

export const moonCommentFetchSingleSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentFetchSingleSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, mooncomment)
);

export const moonCommentFetchSingleFailed = withMatcher(
    (error: Error): MoonCommentFetchSingleFailed => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const moonCommentFetchUserChatsStart = withMatcher(
    (userId: number): MoonCommentFetchUserChatsStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, { userId })
);

export const moonCommentFetchUserChatsSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentFetchUserChatsSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, mooncomment)
);

export const moonCommentFetchUserChatsFailed = withMatcher(
    (error: Error): MoonCommentFetchUserChatsFailed => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const moonCommentFetchAllStart = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentFetchAllStart => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_ALL_START, mooncomment)
);

export const moonCommentFetchAllSuccess = withMatcher(
    (mooncomment: MoonComment[]): MoonCommentFetchAllSuccess => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, mooncomment)
);

export const moonCommentFetchAllFailed = withMatcher(
    (error: Error): MoonCommentFetchAllFailed => 
    createAction(MOON_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
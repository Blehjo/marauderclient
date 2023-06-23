import { PLANET_COMMENT_ACTION_TYPES, PlanetComment } from './channelcomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type PlanetCommentCreateStart = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, planetId: number }
>;

export type PlanetCommentCreateSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentCreateFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PlanetCommentUpdateStart = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.UPDATE_START,
    { planetCommentId: number, commentValue: string, mediaLink: string }
>;

export type PlanetCommentUpdateSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentUpdateFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PlanetCommentDeleteStart = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.DELETE_START,
    { commentId: number }
>;

export type PlanetCommentDeleteSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentDeleteteFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PlanetCommentFetchSingleStart = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { commentId: number }
>;

export type PlanetCommentFetchSingleSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentFetchSingleFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PlanetCommentFetchUserChatsStart = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START,
    { userId: number }
>;

export type PlanetCommentFetchUserChatsSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentFetchUserChatsFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED,
    Error
>;

export type PlanetCommentFetchAllStart = Action<
    PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type PlanetCommentFetchAllSuccess = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    PlanetComment[]
>;

export type PlanetCommentFetchAllFailed = ActionWithPayload<
    PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const planetcommentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, planetId: number ): PlanetCommentCreateStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, planetId })
);

export const planetcommentCreateSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentCreateSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.CREATE_SUCCESS, comment)
);

export const planetcommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const planetcommentUpdateStart = withMatcher(
    (planetCommentId: number, commentValue: string, mediaLink: string, userId: number): PlanetCommentUpdateStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.UPDATE_START, { planetCommentId, commentValue, mediaLink, userId })
);

export const planetcommentUpdateSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentUpdateSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const planetcommentUpdateFailed = withMatcher(
    (error: Error): PlanetCommentUpdateFailed => 
    createAction(PLANET_COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const planetcommentDeleteStart = withMatcher(
    (commentId: number): PlanetCommentDeleteStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.DELETE_START, { commentId })
);

export const planetcommentDeleteSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentDeleteSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const planetcommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const planetcommentFetchSingleStart = withMatcher(
    (commentId: number): PlanetCommentFetchSingleStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { commentId })
);

export const planetcommentFetchSingleSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentFetchSingleSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, comment)
);

export const planetcommentFetchSingleFailed = withMatcher(
    (error: Error): PlanetCommentFetchSingleFailed => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const planetcommentFetchUserChatsStart = withMatcher(
    (userId: number): PlanetCommentFetchUserChatsStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, { userId })
);

export const planetcommentFetchUserChatsSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentFetchUserChatsSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, comment)
);

export const planetcommentFetchUserChatsFailed = withMatcher(
    (error: Error): PlanetCommentFetchUserChatsFailed => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const planetcommentFetchAllStart = withMatcher(
    (comment: PlanetComment[]): PlanetCommentFetchAllStart => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_START, comment)
);

export const planetcommentFetchAllSuccess = withMatcher(
    (comment: PlanetComment[]): PlanetCommentFetchAllSuccess => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const planetcommentFetchAllFailed = withMatcher(
    (error: Error): PlanetCommentFetchAllFailed => 
    createAction(PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
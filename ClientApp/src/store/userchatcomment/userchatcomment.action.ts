import { COMMENT_ACTION_TYPES, UserChatComment } from './userchatcomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type CommentCreateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, chatId: number }
>;

export type CommentCreateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    UserChatComment[]
>;

export type CommentCreateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommentUpdateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_START,
    { userChatCommentId: number, commentValue: string, mediaLink: string }
>;

export type CommentUpdateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    UserChatComment[]
>;

export type CommentUpdateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommentDeleteStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_START,
    { userChatCommentId: number }
>;

export type CommentDeleteSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    UserChatComment[]
>;

export type CommentDeleteteFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type CommentFetchSingleStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { userChatCommentId: number }
>;

export type CommentFetchSingleSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    UserChatComment[]
>;

export type CommentFetchSingleFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type CommentFetchUserChatsStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START,
    { userId: string }
>;

export type CommentFetchUserChatsSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, 
    UserChatComment[]
>;

export type CommentFetchUserChatsFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED,
    Error
>;

export type CommentFetchAllStart = Action<
    COMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type CommentFetchAllSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    UserChatComment[]
>;

export type CommentFetchAllFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const commentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, chatId: number ): CommentCreateStart => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, chatId })
);

export const commentCreateSuccess = withMatcher(
    (comment: UserChatComment[]): CommentCreateSuccess => 
    createAction(COMMENT_ACTION_TYPES.CREATE_SUCCESS, comment)
);

export const commentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const commentUpdateStart = withMatcher(
    (userChatCommentId: number, commentValue: string, mediaLink: string, userId: string): CommentUpdateStart => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_START, { userChatCommentId, commentValue, mediaLink, userId })
);

export const commentUpdateSuccess = withMatcher(
    (comment: UserChatComment[]): CommentUpdateSuccess => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const commentUpdateFailed = withMatcher(
    (error: Error): CommentUpdateFailed => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const commentDeleteStart = withMatcher(
    (userChatCommentId: number): CommentDeleteStart => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, { userChatCommentId })
);

export const commentDeleteSuccess = withMatcher(
    (comment: UserChatComment[]): CommentDeleteSuccess => 
    createAction(COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const commentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const commentFetchSingleStart = withMatcher(
    (userChatCommentId: number): CommentFetchSingleStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { userChatCommentId })
);

export const commentFetchSingleSuccess = withMatcher(
    (comment: UserChatComment[]): CommentFetchSingleSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, comment)
);

export const commentFetchSingleFailed = withMatcher(
    (error: Error): CommentFetchSingleFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const commentFetchUserChatsStart = withMatcher(
    (userId: string): CommentFetchUserChatsStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, { userId })
);

export const commentFetchUserChatsSuccess = withMatcher(
    (comment: UserChatComment[]): CommentFetchUserChatsSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, comment)
);

export const commentFetchUserChatsFailed = withMatcher(
    (error: Error): CommentFetchUserChatsFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const commentFetchAllStart = withMatcher(
    (comment: UserChatComment[]): CommentFetchAllStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_START, comment)
);

export const commentFetchAllSuccess = withMatcher(
    (comment: UserChatComment[]): CommentFetchAllSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const commentFetchAllFailed = withMatcher(
    (error: Error): CommentFetchAllFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
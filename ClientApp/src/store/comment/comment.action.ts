import { COMMENT_ACTION_TYPES, Comment } from './comment.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type CommentCreateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, postId: number }
>;

export type CommentCreateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    Comment[]
>;

export type CommentCreateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommentUpdateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_START,
    { commentId: number, commentValue: string, mediaLink: string }
>;

export type CommentUpdateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    Comment[]
>;

export type CommentUpdateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommentDeleteStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_START,
    { commentId: number }
>;

export type CommentDeleteSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    Comment[]
>;

export type CommentDeleteteFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type CommentFetchSingleStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { commentId: number }
>;

export type CommentFetchSingleSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Comment[]
>;

export type CommentFetchSingleFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type CommentFetchUserChatsStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START,
    { userId: number }
>;

export type CommentFetchUserChatsSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, 
    Comment[]
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
    Comment[]
>;

export type CommentFetchAllFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const commentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, postId: number ): CommentCreateStart => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, postId })
);

export const commentCreateSuccess = withMatcher(
    (comment: Comment[]): CommentCreateSuccess => 
    createAction(COMMENT_ACTION_TYPES.CREATE_SUCCESS, comment)
);

export const commentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const commentUpdateStart = withMatcher(
    (commentId: number, commentValue: string, mediaLink: string, userId: number): CommentUpdateStart => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_START, { commentId, commentValue, mediaLink, userId })
);

export const commentUpdateSuccess = withMatcher(
    (comment: Comment[]): CommentUpdateSuccess => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const commentUpdateFailed = withMatcher(
    (error: Error): CommentUpdateFailed => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const commentDeleteStart = withMatcher(
    (commentId: number): CommentDeleteStart => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, { commentId })
);

export const commentDeleteSuccess = withMatcher(
    (comment: Comment[]): CommentDeleteSuccess => 
    createAction(COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const commentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const commentFetchSingleStart = withMatcher(
    (commentId: number): CommentFetchSingleStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { commentId })
);

export const commentFetchSingleSuccess = withMatcher(
    (comment: Comment[]): CommentFetchSingleSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, comment)
);

export const commentFetchSingleFailed = withMatcher(
    (error: Error): CommentFetchSingleFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const commentFetchUserChatsStart = withMatcher(
    (userId: number): CommentFetchUserChatsStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, { userId })
);

export const commentFetchUserChatsSuccess = withMatcher(
    (comment: Comment[]): CommentFetchUserChatsSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, comment)
);

export const commentFetchUserChatsFailed = withMatcher(
    (error: Error): CommentFetchUserChatsFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const commentFetchAllStart = withMatcher(
    (comment: Comment[]): CommentFetchAllStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_START, comment)
);

export const commentFetchAllSuccess = withMatcher(
    (comment: Comment[]): CommentFetchAllSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const commentFetchAllFailed = withMatcher(
    (error: Error): CommentFetchAllFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
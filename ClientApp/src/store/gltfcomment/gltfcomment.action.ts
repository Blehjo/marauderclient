import { COMMENT_ACTION_TYPES, GltfComment } from './gltfcomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type CommentCreateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, gltfId: number }
>;

export type CommentCreateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    GltfComment[]
>;

export type CommentCreateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommentUpdateStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_START,
    { gltfCommentId: number, commentValue: string, mediaLink: string }
>;

export type CommentUpdateSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    GltfComment[]
>;

export type CommentUpdateFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommentDeleteStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_START,
    { gltfCommentId: number }
>;

export type CommentDeleteSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    GltfComment[]
>;

export type CommentDeleteteFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type GltfCommentFetchSingleStart = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { gltfCommentId: number }
>;

export type CommentFetchSingleSuccess = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    GltfComment[]
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
    GltfComment[]
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
    GltfComment[]
>;

export type CommentFetchAllFailed = ActionWithPayload<
    COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const commentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, gltfId: number ): CommentCreateStart => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, gltfId })
);

export const commentCreateSuccess = withMatcher(
    (comments: GltfComment[]): CommentCreateSuccess => 
    createAction(COMMENT_ACTION_TYPES.CREATE_SUCCESS, comments)
);

export const commentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const commentUpdateStart = withMatcher(
    (gltfCommentId: number, commentValue: string, mediaLink: string, userId: string): CommentUpdateStart => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_START, { gltfCommentId, commentValue, mediaLink, userId })
);

export const commentUpdateSuccess = withMatcher(
    (comment: GltfComment[]): CommentUpdateSuccess => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const commentUpdateFailed = withMatcher(
    (error: Error): CommentUpdateFailed => 
    createAction(COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const commentDeleteStart = withMatcher(
    (gltfCommentId: number): CommentDeleteStart => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, { gltfCommentId })
);

export const commentDeleteSuccess = withMatcher(
    (comment: GltfComment[]): CommentDeleteSuccess => 
    createAction(COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const commentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const gltfcommentFetchSingleStart = withMatcher(
    (gltfCommentId: number): GltfCommentFetchSingleStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { gltfCommentId })
);

export const commentFetchSingleSuccess = withMatcher(
    (comment: GltfComment[]): CommentFetchSingleSuccess => 
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
    (comment: GltfComment[]): CommentFetchUserChatsSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, comment)
);

export const commentFetchUserChatsFailed = withMatcher(
    (error: Error): CommentFetchUserChatsFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const commentFetchAllStart = withMatcher(
    (comment: GltfComment[]): CommentFetchAllStart => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_START, comment)
);

export const commentFetchAllSuccess = withMatcher(
    (comment: GltfComment[]): CommentFetchAllSuccess => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const commentFetchAllFailed = withMatcher(
    (error: Error): CommentFetchAllFailed => 
    createAction(COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
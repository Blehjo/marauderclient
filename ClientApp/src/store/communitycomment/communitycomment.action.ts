import { COMMUNITY_COMMENT_ACTION_TYPES, CommunityComment } from './communitycomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type CommunityCommentCreateStart = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.CREATE_START, { commentValue: string, imageFile: File, postId: number }
>;

export type CommunityCommentCreateSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentCreateFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommunityCommentUpdateStart = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_START,
    { commentId: number, commentValue: string, mediaLink: string }
>;

export type CommunityCommentUpdateSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentUpdateFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommunityCommentDeleteStart = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.DELETE_START,
    { commentId: number }
>;

export type CommunityCommentDeleteSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentDeleteteFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type CommunityCommentFetchSingleStart = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { commentId: number }
>;

export type CommunityCommentFetchSingleSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentFetchSingleFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type CommunityCommentFetchUserChatsStart = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START,
    { userId: string }
>;

export type CommunityCommentFetchUserChatsSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentFetchUserChatsFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED,
    Error
>;

export type CommunityCommentFetchAllStart = Action<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type CommunityCommentFetchAllSuccess = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    CommunityComment[]
>;

export type CommunityCommentFetchAllFailed = ActionWithPayload<
    COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const communityCommentCreateStart = withMatcher(
    (commentValue: string, imageFile: File, postId: number ): CommunityCommentCreateStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.CREATE_START, { commentValue, imageFile, postId })
);

export const communityCommentCreateSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentCreateSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.CREATE_SUCCESS, comment)
);

export const communityCommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const communityCommentUpdateStart = withMatcher(
    (commentId: number, commentValue: string, mediaLink: string, userId: string): CommunityCommentUpdateStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_START, { commentId, commentValue, mediaLink, userId })
);

export const communityCommentUpdateSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentUpdateSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_SUCCESS, comment)
);

export const communityCommentUpdateFailed = withMatcher(
    (error: Error): CommunityCommentUpdateFailed => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const communityCommentDeleteStart = withMatcher(
    (commentId: number): CommunityCommentDeleteStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.DELETE_START, { commentId })
);

export const communityCommentDeleteSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentDeleteSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.DELETE_SUCCESS, comment)
);

export const communityCommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.DELETE_START, error)
);

export const communityCommentFetchSingleStart = withMatcher(
    (commentId: number): CommunityCommentFetchSingleStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, { commentId })
);

export const communityCommentFetchSingleSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentFetchSingleSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, comment)
);

export const communityCommentFetchSingleFailed = withMatcher(
    (error: Error): CommunityCommentFetchSingleFailed => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const communityCommentFetchUserChatsStart = withMatcher(
    (userId: string): CommunityCommentFetchUserChatsStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, { userId })
);

export const communityCommentFetchUserChatsSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentFetchUserChatsSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_SUCCESS, comment)
);

export const communityCommentFetchUserChatsFailed = withMatcher(
    (error: Error): CommunityCommentFetchUserChatsFailed => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_FAILED, error)
);

export const communityCommentFetchAllStart = withMatcher(
    (comment: CommunityComment[]): CommunityCommentFetchAllStart => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_START, comment)
);

export const communityCommentFetchAllSuccess = withMatcher(
    (comment: CommunityComment[]): CommunityCommentFetchAllSuccess => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, comment)
);

export const communityCommentFetchAllFailed = withMatcher(
    (error: Error): CommunityCommentFetchAllFailed => 
    createAction(COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
import { MESSAGECOMMENT_ACTION_TYPES, MessageComment } from './messagecomment.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type MessageCommentCreateStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_START, { messageId: number, messageValue: string, imageFile: File }
>;

export type MessageCommentCreateSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentCreateFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MessageCommentUpdateStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_START,
    { messageCommentId: number, messageValue: string, mediaLink: string }
>;

export type MessageCommentUpdateSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentUpdateFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MessageCommentDeleteStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_START,
    { messageCommentId: number }
>;

export type MessageCommentDeleteSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentDeleteteFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MessageCommentFetchSingleStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    { messageId: number }
>;

export type MessageCommentFetchSingleSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentFetchSingleFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MessageCommentFetchUserMessagesStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_START,
    { userId: string }
>;

export type MessageCommentFetchUserMessagesSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentFetchUserMessagesFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_FAILED,
    Error
>;

export type MessageCommentFetchAllStart = Action<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type MessageCommentFetchAllSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    MessageComment[]
>;

export type MessageCommentFetchAllFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type MessageCommentSetID = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.SET_ID,
    { messageCommentId: number }
>;

export type MessageCommentSetIDSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.SET_ID_SUCCESS,
    { messageCommentId: number }
>;

export type MessageCommentSetIDFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.SET_ID_FAILED,
    { messageCommentId: number }
>;

export const messagecommentCreateStart = withMatcher(
    (messageId: number, messageValue: string, imageFile: File): MessageCommentCreateStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_START, { messageId, messageValue, imageFile })
);

export const messagecommentCreateSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentCreateSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_SUCCESS, messages)
);

export const messagecommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const messagecommentUpdateStart = withMatcher(
    (messageCommentId: number, messageValue: string, mediaLink: string): MessageCommentUpdateStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_START, { messageCommentId, messageValue, mediaLink })
);

export const messagecommentUpdateSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentUpdateSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_SUCCESS, messages)
);

export const messagecommentUpdateFailed = withMatcher(
    (error: Error): MessageCommentUpdateFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const messagecommentDeleteStart = withMatcher(
    (messageCommentId: number): MessageCommentDeleteStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_START, { messageCommentId })
);

export const messagecommentDeleteSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentDeleteSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_SUCCESS, messages)
);

export const messagecommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_START, error)
);

export const messagecommentFetchSingleStart = withMatcher(
    (messageId: number): MessageCommentFetchSingleStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_START, { messageId })
);

export const messagecommentFetchSingleSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentFetchSingleSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, messages)
);

export const messagecommentFetchSingleFailed = withMatcher(
    (error: Error): MessageCommentFetchSingleFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const messagecommentFetchUserMessagesStart = withMatcher(
    (userId: string): MessageCommentFetchUserMessagesStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_START, { userId })
);

export const messagecommentFetchUserMessagesSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentFetchUserMessagesSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_SUCCESS, messages)
);

export const messagecommentFetchUserMessagesFailed = withMatcher(
    (error: Error): MessageCommentFetchUserMessagesFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_FAILED, error)
);

export const messagecommentFetchAllStart = withMatcher(
    (): MessageCommentFetchAllStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_START)
);

export const messagecommentFetchAllSuccess = withMatcher(
    (messages: MessageComment[]): MessageCommentFetchAllSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, messages)
);

export const messagecommentFetchAllFailed = withMatcher(
    (error: Error): MessageCommentFetchAllFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const messageCommentSetId = withMatcher(
    (messageCommentId: number): MessageCommentSetID => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.SET_ID, { messageCommentId })
);

export const messageCommentSetIdSuccess = withMatcher(
    (messageCommentId: number): MessageCommentSetIDSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.SET_ID_SUCCESS, { messageCommentId })
);

export const messageCommentSetIdFailed = withMatcher(
    (messageCommentId: number): MessageCommentSetIDFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.SET_ID_FAILED, { messageCommentId })
);
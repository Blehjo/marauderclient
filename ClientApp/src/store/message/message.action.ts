import { MESSAGE_ACTION_TYPES, Message } from './message.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MessageCreateStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_START, { messageValue: string }
>;

export type MessageCreateSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_SUCCESS, 
    Message
>;

export type MessageCreateFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MessageUpdateStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_START,
    { messageId: number, messageValue: string }
>;

export type MessageUpdateSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_SUCCESS, 
    Message[]
>;

export type MessageUpdateFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MessageDeleteStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_START,
    { messageId: number }
>;

export type MessageDeleteSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_SUCCESS, 
    Message[]
>;

export type MessageDeleteteFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MessageFetchSingleStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_START,
    { messageId: number }
>;

export type MessageFetchSingleSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Message
>;

export type MessageFetchSingleFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MessageFetchUserMessagesStart = Action<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START
>;

export type MessageFetchUserMessagesSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, 
    Message[]
>;

export type MessageFetchUserMessagesFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_FAILED,
    Error
>;

export type MessageFetchAllStart = Action<
    MESSAGE_ACTION_TYPES.FETCH_ALL_START
>;

export type MessageFetchAllSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Message[]
>;

export type MessageFetchAllFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type MessageSetID = ActionWithPayload<
    MESSAGE_ACTION_TYPES.SET_ID,
    { messageId: number }
>;

export type MessageSetIDSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.SET_ID_SUCCESS,
    { messageId: number }
>;

export const messageCreateStart = withMatcher(
    (messageValue: string): MessageCreateStart => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_START, { messageValue })
);

export const messageCreateSuccess = withMatcher(
    (message: Message): MessageCreateSuccess => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_SUCCESS, message)
);

export const messageCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_START, error)
);
 
export const messageUpdateStart = withMatcher(
    (messageId: number, messageValue: string): MessageUpdateStart => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_START, { messageId, messageValue })
);

export const messageUpdateSuccess = withMatcher(
    (message: Message[]): MessageUpdateSuccess => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_SUCCESS, message)
);

export const messageUpdateFailed = withMatcher(
    (error: Error): MessageUpdateFailed => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const messageDeleteStart = withMatcher(
    (messageId: number): MessageDeleteStart => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_START, { messageId })
);

export const messageDeleteSuccess = withMatcher(
    (message: Message[]): MessageDeleteSuccess => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_SUCCESS, message)
);

export const messageDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_START, error)
);

export const messageFetchSingleStart = withMatcher(
    (messageId: number): MessageFetchSingleStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_START, { messageId })
);

export const messageFetchSingleSuccess = withMatcher(
    (message: Message): MessageFetchSingleSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, message)
);

export const messageFetchSingleFailed = withMatcher(
    (error: Error): MessageFetchSingleFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const messageFetchUserMessagesStart = withMatcher(
    (): MessageFetchUserMessagesStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START)
);

export const messageFetchUserMessagesSuccess = withMatcher(
    (message: Message[]): MessageFetchUserMessagesSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, message)
);

export const messageFetchUserMessagesFailed = withMatcher(
    (error: Error): MessageFetchUserMessagesFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_FAILED, error)
);

export const messageFetchAllStart = withMatcher(
    (): MessageFetchAllStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_START)
);

export const messageFetchAllSuccess = withMatcher(
    (message: Message[]): MessageFetchAllSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_SUCCESS, message)
);

export const messageFetchAllFailed = withMatcher(
    (error: Error): MessageFetchAllFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const messageSetId = withMatcher(
    (messageId: number): MessageSetID => 
    createAction(MESSAGE_ACTION_TYPES.SET_ID, { messageId })
);

export const messageSetIdSuccess = withMatcher(
    (messageId: number): MessageSetIDSuccess => 
    createAction(MESSAGE_ACTION_TYPES.SET_ID_SUCCESS, { messageId })
);
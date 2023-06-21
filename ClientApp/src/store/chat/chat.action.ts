import { CHAT_ACTION_TYPES, Chat } from './chat.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type ChatCreateStart = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_START, { title: string, artificialId: number }
>;

export type ChatCreateSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_SUCCESS, 
    Chat
>;

export type ChatCreateFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ChatUpdateStart = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_START,
    { chatId: number, title: string, userId: number }
>;

export type ChatUpdateSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_SUCCESS, 
    Chat[]
>;

export type ChatUpdateFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ChatDeleteStart = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_START,
    { chatId: number }
>;

export type ChatDeleteSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_SUCCESS, 
    Chat[]
>;

export type ChatDeleteteFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ChatFetchSingleStart = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_START,
    { chatId: number }
>;

export type ChatFetchSingleSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Chat
>;

export type ChatFetchSingleFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ChatFetchUserChatsStart = Action<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_START
>;

export type ChatFetchUserChatsSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_SUCCESS, 
    Chat[]
>;

export type ChatFetchUserChatsFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_FAILED,
    Error
>;

export type ChatFetchSingleUserChatsStart = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_START,
    { userId: number }
>;

export type ChatFetchSingleUserChatsSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_SUCCESS, 
    Chat[]
>;

export type ChatFetchSingleUserChatsFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_FAILED,
    Error
>;

export type ChatFetchAllStart = Action<
    CHAT_ACTION_TYPES.FETCH_ALL_START
>;

export type ChatFetchAllSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Chat[]
>;

export type ChatFetchAllFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type ChatSetID = ActionWithPayload<
    CHAT_ACTION_TYPES.SET_ID,
    { chatId: number }
>;

export type ChatSetIDSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.SET_ID_SUCCESS,
    { chatId: number }
>;

export const chatCreateStart = withMatcher(
    (title: string, artificialId: number): ChatCreateStart => 
    createAction(CHAT_ACTION_TYPES.CREATE_START, { title, artificialId })
);

export const chatCreateSuccess = withMatcher(
    (chat: Chat): ChatCreateSuccess => 
    createAction(CHAT_ACTION_TYPES.CREATE_SUCCESS, chat)
);

export const chatCreateFailed = withMatcher(
    (error: Error) => 
    createAction(CHAT_ACTION_TYPES.CREATE_START, error)
);
 
export const chatUpdateStart = withMatcher(
    (chatId: number, title: string, userId: number): ChatUpdateStart => 
    createAction(CHAT_ACTION_TYPES.UPDATE_START, { chatId, title, userId })
);

export const chatUpdateSuccess = withMatcher(
    (chat: Chat[]): ChatUpdateSuccess => 
    createAction(CHAT_ACTION_TYPES.UPDATE_SUCCESS, chat)
);

export const chatUpdateFailed = withMatcher(
    (error: Error): ChatUpdateFailed => 
    createAction(CHAT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const chatDeleteStart = withMatcher(
    (chatId: number): ChatDeleteStart => 
    createAction(CHAT_ACTION_TYPES.DELETE_START, { chatId })
);

export const chatDeleteSuccess = withMatcher(
    (chat: Chat[]): ChatDeleteSuccess => 
    createAction(CHAT_ACTION_TYPES.DELETE_SUCCESS, chat)
);

export const chatDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(CHAT_ACTION_TYPES.DELETE_START, error)
);

export const chatFetchSingleStart = withMatcher(
    (chatId: number): ChatFetchSingleStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_START, { chatId })
);

export const chatFetchSingleSuccess = withMatcher(
    (chat: Chat): ChatFetchSingleSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, chat)
);

export const chatFetchSingleFailed = withMatcher(
    (error: Error): ChatFetchSingleFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const chatFetchUserChatsStart = withMatcher(
    (): ChatFetchUserChatsStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_START)
);

export const chatFetchUserChatsSuccess = withMatcher(
    (chat: Chat[]): ChatFetchUserChatsSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_SUCCESS, chat)
);

export const chatFetchUserChatsFailed = withMatcher(
    (error: Error): ChatFetchUserChatsFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_FAILED, error)
);

export const chatFetchSingleUserChatsStart = withMatcher(
    (userId: number): ChatFetchSingleUserChatsStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_START, { userId })
);

export const chatFetchSingleUserChatsSuccess = withMatcher(
    (chat: Chat[]): ChatFetchSingleUserChatsSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_SUCCESS, chat)
);

export const chatFetchSingleUserChatsFailed = withMatcher(
    (error: Error): ChatFetchSingleUserChatsFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_FAILED, error)
);

export const chatFetchAllStart = withMatcher(
    (): ChatFetchAllStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_START)
);

export const chatFetchAllSuccess = withMatcher(
    (chat: Chat[]): ChatFetchAllSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, chat)
);

export const chatFetchAllFailed = withMatcher(
    (error: Error): ChatFetchAllFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const chatSetId = withMatcher(
    (chatId: number): ChatSetID => 
    createAction(CHAT_ACTION_TYPES.SET_ID, { chatId })
);

export const chatSetIdSuccess = withMatcher(
    (chatId: number): ChatSetIDSuccess => 
    createAction(CHAT_ACTION_TYPES.SET_ID_SUCCESS, { chatId })
);
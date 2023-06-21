import { AnyAction } from 'redux';

import { Chat } from './chat.types';

import {
    chatCreateStart,
    chatCreateSuccess,
    chatCreateFailed,
    chatUpdateStart,
    chatUpdateSuccess,
    chatUpdateFailed,
    chatDeleteStart,
    chatDeleteSuccess,
    chatDeleteFailed,
    chatFetchSingleStart,
    chatFetchSingleSuccess,
    chatFetchSingleFailed,
    chatFetchAllStart,
    chatFetchAllSuccess,
    chatFetchAllFailed,
    chatFetchSingleUserChatsStart,
    chatFetchUserChatsStart,
    chatFetchSingleUserChatsSuccess,
    chatFetchUserChatsSuccess,
    chatSetId,
    chatSetIdSuccess,
} from './chat.action';

export type ChatState = {
    readonly chatId: number | null;
    readonly singleChat: Chat | null;
    readonly userChats: Chat[] | null;
    readonly singleUserChats: Chat[] | null;
    readonly chats: Chat[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: ChatState = {
    chatId: null,
    singleChat: null,
    userChats: [],
    singleUserChats: [],
    chats: [],
    isLoading: false,
    error: null
};

export const chatReducer = (
    state = INITIAL_STATE, action: AnyAction
): ChatState => {
    if (
        chatFetchAllStart.match(action) ||
        chatFetchSingleStart.match(action) ||
        chatFetchSingleUserChatsStart.match(action) ||
        chatFetchUserChatsStart.match(action) ||
        chatCreateStart.match(action) ||
        chatDeleteStart.match(action) ||
        chatSetId.match(action)
    ) {
        return { ...state, isLoading: true }
    }    
    if (
        chatCreateSuccess.match(action) ||
        chatFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleChat: action.payload }
    }  
    if (
        chatFetchUserChatsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userChats: action.payload }
    }  
    if (
        chatSetIdSuccess.match(action)
    ) {
        return { ...state, isLoading: false, chatId: action.payload.chatId }
    }  
    if (
        chatFetchSingleUserChatsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, singleUserChats: action.payload }
    }  
    if (
        chatUpdateSuccess.match(action) ||
        chatFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, chats: action.payload };
    } 
    if (
        chatDeleteSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userChats: action.payload };
    } 
    if (
        chatCreateFailed.match(action) ||
        chatUpdateFailed.match(action) ||
        chatDeleteFailed.match(action) ||
        chatFetchSingleFailed.match(action) ||
        chatFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
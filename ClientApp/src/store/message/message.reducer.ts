import { AnyAction } from 'redux';

import { Message } from './message.types';

import {
    messageCreateStart,
    messageCreateSuccess,
    messageCreateFailed,
    messageUpdateStart,
    messageUpdateSuccess,
    messageUpdateFailed,
    messageDeleteStart,
    messageDeleteSuccess,
    messageDeleteFailed,
    messageFetchSingleStart,
    messageFetchSingleSuccess,
    messageFetchSingleFailed,
    messageFetchAllStart,
    messageFetchAllSuccess,
    messageFetchAllFailed,
    messageFetchUserMessagesSuccess,
    messageFetchUserMessagesStart,
    messageSetIdSuccess,
} from './message.action';

export type MessageState = {
    readonly messageId: number | null;
    readonly singleMessage: Message | null;
    readonly userMessages: Message[] | null;
    readonly messages: Message[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: MessageState = {
    messageId: null,
    singleMessage: null,
    userMessages: [],
    messages: [],
    isLoading: false,
    error: null,
};

export const messageReducer = (
    state = INITIAL_STATE, action: AnyAction
): MessageState => {
    if (
        messageFetchAllStart.match(action) ||
        messageFetchSingleStart.match(action) ||
        messageFetchUserMessagesStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    } 
    if (
        messageFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleMessage: action.payload }
    } 
    if (
        messageDeleteSuccess.match(action) ||
        messageFetchUserMessagesSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userMessages: action.payload }
    } 
    if (
        messageUpdateSuccess.match(action) ||
        messageFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, messages: action.payload };
    } 
    if (
        messageSetIdSuccess.match(action)
    ) {
        return { ...state, isLoading: false, messageId: action.payload.messageId }
    } 
    if (
        messageCreateSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleMessage: action.payload }
    }  
    if (
        messageCreateFailed.match(action) ||
        messageUpdateFailed.match(action) ||
        messageDeleteFailed.match(action) ||
        messageFetchSingleFailed.match(action) ||
        messageFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
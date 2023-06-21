import { takeLatest, put, all, call } from 'typed-redux-saga';

import { Chat, CHAT_ACTION_TYPES } from './chat.types';

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
    ChatCreateStart,
    ChatCreateSuccess,
    ChatFetchAllStart,
    ChatFetchSingleStart,
    ChatFetchUserChatsStart,
    ChatUpdateStart,
    ChatDeleteStart,
    ChatFetchSingleUserChatsStart,
    chatFetchSingleUserChatsSuccess,
    chatFetchSingleUserChatsFailed,
    chatFetchUserChatsSuccess,
    chatFetchUserChatsFailed,
    ChatSetID,
    chatSetId,
    chatSetIdSuccess
} from './chat.action';

import { 
    getSingleChat,
    getAllChats,
    getUserChats,
    getUsersChats,
    getChats, 
    addChat, 
    editChat,
    deleteChat
} from '../../utils/api/chat.api';

export function* startSetId({ payload: { chatId }}: ChatSetID) {
    yield* put(chatSetIdSuccess(chatId));
}

export function* createChat({ payload: { title, artificialId }}: ChatCreateStart ) {
    try {
        const chat = yield* call(
            addChat,
            title,
            artificialId
        ); 
        yield* put(chatCreateSuccess(chat));
    } catch (error) {
        yield* put(chatCreateFailed(error as Error));
    }
}

export function* updateChat({ payload: { chatId, title, userId }}: ChatUpdateStart) {
    try {
        const chat = yield* call(
            editChat,
            chatId,
            title,
            userId
        ); 
        yield* put(chatUpdateSuccess(chat));
    } catch (error) {
        yield* put(chatCreateFailed(error as Error));
    }
}

export function* removeChat({ payload: { chatId }}: ChatDeleteStart) {
    try {
        const chats = yield* call(
            deleteChat,
            chatId
        ); 
        yield* put(chatDeleteSuccess(chats));
    } catch (error) {
        yield* put(chatDeleteFailed(error as Error));
    }
}

export function* fetchUserChats() {
    try {
        const chat = yield* call(getUsersChats);
        if (!chat) return;
        yield* put(chatFetchUserChatsSuccess(chat));
    } catch (error) {
        yield* put(chatFetchUserChatsFailed(error as Error));
    }
}

export function* fetchOtherUsersChats({ payload: { userId } }: ChatFetchSingleUserChatsStart) {
    try {
        const chats = yield* call(
            getUserChats,
            userId
        );
        if (!chats) return;
        yield* put(chatFetchSingleUserChatsSuccess(chats));
    } catch (error) {
        yield* put(chatFetchSingleUserChatsFailed(error as Error));
    }
}

export function* fetchSingleChatAsync({ 
    payload: { chatId } }: ChatFetchSingleStart) {
    try {
        const chatSnapshot = yield* call(
            getSingleChat,
            chatId 
        );
        yield* put(chatFetchSingleSuccess(chatSnapshot as Chat));
    } catch (error) {
        yield* put(chatFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChatsAsync() {
    try {
        const chats = yield* call(getAllChats);
        yield* put(chatFetchAllSuccess(chats));
    } catch (error) {
        yield* put(chatFetchAllFailed(error as Error));
    }
}

export function* onSetId() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.SET_ID,
        startSetId
    );
}

export function* onCreateStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.CREATE_START, 
        createChat
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.UPDATE_START, 
        updateChat
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.DELETE_START, 
        removeChat
    );
}

export function* onFetchUserChatsStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.FETCH_USER_CHATS_START, 
        fetchUserChats
    );
}

export function* onFetchOthersUserChatsStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.FETCH_SINGLE_USER_CHATS_START, 
        fetchOtherUsersChats
    );
}

export function* onFetchSingleChatStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChatAsync
    );
}
  
export function* onFetchChatsStart() {
    yield* takeLatest(
        CHAT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChatsAsync
    );
}

export function* chatSagas() {
    yield* all([
        call(onSetId),
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserChatsStart),
        call(onFetchOthersUserChatsStart),
        call(onFetchSingleChatStart),
        call(onFetchChatsStart)
    ]);
}
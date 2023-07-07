import { all, call, put, takeLatest } from 'typed-redux-saga';

import { ArtificialIntelligenceChat, ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES } from './artificialintelligencechat.types';

import {
    artificialIntelligenceChatCreateFailed,
    ArtificialIntelligenceChatCreateStart,
    artificialIntelligenceChatCreateSuccess,
    artificialIntelligenceChatDeleteFailed,
    ArtificialIntelligenceChatDeleteStart,
    artificialIntelligenceChatDeleteSuccess,
    artificialIntelligenceChatFetchAllFailed,
    artificialIntelligenceChatFetchAllSuccess,
    artificialIntelligenceChatFetchOtherUsersFailed,
    ArtificialIntelligenceChatFetchOtherUsersStart,
    artificialIntelligenceChatFetchOtherUsersSuccess,
    artificialIntelligenceChatFetchSingleFailed,
    ArtificialIntelligenceChatFetchSingleStart,
    artificialIntelligenceChatFetchSingleSuccess,
    artificialIntelligenceChatFetchUsersFailed,
    artificialIntelligenceChatFetchUsersSuccess,
    ArtificialIntelligenceChatUpdateStart,
    artificialIntelligenceChatUpdateSuccess
} from './artificialintelligencechat.action';

import {
    addArtificialIntelligenceChat,
    deleteArtificialIntelligenceChat,
    getAllArtificialIntelligenceChats,
    getOtherUserArtificialIntelligenceChats,
    getSingleArtificialIntelligenceChat,
    getUsersArtificialIntelligenceChats
} from '../../utils/api/artificialintelligencechat.api';

export function* createArtificialIntelligenceChat({ payload: { artificialIntelligenceId, artificialIntelligence, chatId, chat }}: ArtificialIntelligenceChatCreateStart ) {
    const formData = new FormData();
    try {
        const artificialIntelligenceChat = yield* call(
            addArtificialIntelligenceChat,
            artificialIntelligenceId,
            artificialIntelligence,
            chatId, chat
        ); 
        yield* put(artificialIntelligenceChatCreateSuccess(artificialIntelligenceChat));
    } catch (error) {
        yield* put(artificialIntelligenceChatCreateFailed(error as Error));
    }
}

export function* removeChat({ payload: { artificialIntelligenceChatId }}: ArtificialIntelligenceChatDeleteStart) {
    try {
        const artificialIntelligenceChats = yield* call(
            deleteArtificialIntelligenceChat,
            artificialIntelligenceChatId
        ); 
        yield* put(artificialIntelligenceChatDeleteSuccess(artificialIntelligenceChats));
    } catch (error) {
        yield* put(artificialIntelligenceChatDeleteFailed(error as Error));
    }
}

export function* fetchUserArtificialIntelligenceChats() {
    try {
        const artificialIntelligenceChat = yield* call(getUsersArtificialIntelligenceChats);
        if (!artificialIntelligenceChat) return;
        yield* put(artificialIntelligenceChatFetchUsersSuccess(artificialIntelligenceChat));
    } catch (error) {
        yield* put(artificialIntelligenceChatFetchUsersFailed(error as Error));
    }
}

export function* fetchOtherUsersArtificialIntelligenceChats({ payload: { userId } }: ArtificialIntelligenceChatFetchOtherUsersStart) {
    try {
        const artificialIntelligenceChats = yield* call(
            getOtherUserArtificialIntelligenceChats,
            userId
        );
        if (!artificialIntelligenceChats) return;
        yield* put(artificialIntelligenceChatFetchOtherUsersSuccess(artificialIntelligenceChats));
    } catch (error) {
        yield* put(artificialIntelligenceChatFetchOtherUsersFailed(error as Error));
    }
}

export function* fetchSingleChatAsync({ 
    payload: { artificialIntelligenceChatId } }: ArtificialIntelligenceChatFetchSingleStart) {
    try {
        const artificialIntelligenceChatSnapshot = yield* call(
            getSingleArtificialIntelligenceChat,
            artificialIntelligenceChatId 
        );
        yield* put(artificialIntelligenceChatFetchSingleSuccess(artificialIntelligenceChatSnapshot as ArtificialIntelligenceChat));
    } catch (error) {
        yield* put(artificialIntelligenceChatFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChatsAsync() {
    try {
        const artificialIntelligenceChats = yield* call(getAllArtificialIntelligenceChats);
        yield* put(artificialIntelligenceChatFetchAllSuccess(artificialIntelligenceChats));
    } catch (error) {
        yield* put(artificialIntelligenceChatFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_START, 
        createArtificialIntelligenceChat
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_START, 
        removeChat
    );
}

export function* onFetchUserChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START, 
        fetchUserArtificialIntelligenceChats
    );
}

export function* onFetchOtherUserChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, 
        fetchOtherUsersArtificialIntelligenceChats
    );
}

export function* onFetchSingleChatStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChatAsync
    );
}
  
export function* onFetchChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChatsAsync
    );
}

export function* artificialIntelligenceChatSagas() {
    yield* all([
        call(onCreateStart),
        call(onDeleteStart),
        call(onFetchUserChatsStart),
        call(onFetchOtherUserChatsStart),
        call(onFetchSingleChatStart),
        call(onFetchChatsStart)
    ]);
}
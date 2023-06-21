import { takeLatest, put, all, call } from 'typed-redux-saga';

import { ChatComment, CHATCOMMENT_ACTION_TYPES } from './chatcomment.types';

import {
    chatcommentCreateStart,
    chatcommentCreateSuccess,
    chatcommentCreateFailed,
    chatcommentUpdateStart,
    chatcommentUpdateSuccess,
    chatcommentUpdateFailed,
    chatcommentDeleteStart,
    chatcommentDeleteSuccess,
    chatcommentDeleteFailed,
    chatcommentFetchSingleStart,
    chatcommentFetchSingleSuccess,
    chatcommentFetchSingleFailed,
    chatcommentFetchAllStart,
    chatcommentFetchAllSuccess,
    chatcommentFetchAllFailed,
    ChatCommentCreateStart,
    ChatCommentCreateSuccess,
    ChatCommentFetchAllStart,
    ChatCommentFetchSingleStart,
    ChatCommentFetchUserChatsStart,
    ChatCommentUpdateStart,
    ChatCommentDeleteStart
} from './chatcomment.action';

import { 
    getSingleChatComment,
    getAllChatComments,
    getUserChatComments,
    getUsersChatComments,
    getChatComments, 
    addChatComment, 
    editChatComment,
    deleteChatComment
} from '../../utils/api/chatcomment.api';

export function* createChatComment({ payload: { chatId, chatValue, mediaLink }}: ChatCommentCreateStart ) {
    const formData = new FormData();
    formData.append('chatValue', chatValue);
    formData.append('mediaLink', mediaLink);
    try {
        const chatcomment = yield* call(
            addChatComment,
            chatId,
            formData
        ); 
        yield* put(chatcommentCreateSuccess(chatcomment));
    } catch (error) {
        yield* put(chatcommentCreateFailed(error as Error));
    }
}

export function* updateChatComment({ payload: { chatcommentId, chatcommentValue }}: ChatCommentUpdateStart) {
    try {
        const chatcomment = yield* call(
            editChatComment,
            chatcommentId,
            chatcommentValue
        ); 
        yield* put(chatcommentUpdateSuccess(chatcomment));
    } catch (error) {
        yield* put(chatcommentCreateFailed(error as Error));
    }
}

export function* removeChatComment({ payload: { chatcommentId }}: ChatCommentDeleteStart) {
    try {
        const chatcomments = yield* call(
            deleteChatComment,
            chatcommentId
        ); 
        yield* put(chatcommentDeleteSuccess(chatcomments));
    } catch (error) {
        yield* put(chatcommentDeleteFailed(error as Error));
    }
}

export function* fetchUserChatComments() {
    try {
        const chat = yield* call(getUsersChatComments);
        if (!chat) return;
        yield* call(chatcommentFetchAllSuccess, chat);
    } catch (error) {
        yield* put(chatcommentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersChats({ payload: { userId } }: ChatCommentFetchUserChatsStart) {
    try {
        const chats = yield* call(
            getUserChatComments,
            userId
        );
        if (!chats) return;
        yield* call(chatcommentFetchAllSuccess, chats);
    } catch (error) {
        yield* put(chatcommentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleChatCommentAsync({ 
    payload: { chatId } }: ChatCommentFetchSingleStart) {
    try {
        const chatSnapshot = yield* call(
            getSingleChatComment,
            chatId 
        );
        yield* put(chatcommentFetchSingleSuccess(chatSnapshot));
    } catch (error) {
        yield* put(chatcommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChatCommentsAsync() {
    try {
        const chats = yield* call(getAllChatComments);
        yield* put(chatcommentFetchAllSuccess(chats));
    } catch (error) {
        yield* put(chatcommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.CREATE_START, 
        createChatComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.UPDATE_START, 
        updateChatComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.DELETE_START, 
        removeChatComment
    );
}

export function* onFetchUserChatCommentsStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.FETCH_USER_CHATCOMMENTS_START, 
        fetchUserChatComments
    );
}

export function* onFetchSingleChatStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChatCommentAsync
    );
}
  
export function* onFetchChatsStart() {
    yield* takeLatest(
        CHATCOMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChatCommentsAsync
    );
}

export function* chatCommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserChatCommentsStart),
        call(onFetchSingleChatStart),
        call(onFetchChatsStart)
    ]);
}
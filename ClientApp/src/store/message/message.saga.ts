import { all, call, put, takeLatest } from 'typed-redux-saga';

import { Message, MESSAGE_ACTION_TYPES } from './message.types';

import {
    messageCreateFailed,
    MessageCreateStart,
    messageCreateSuccess,
    messageDeleteFailed,
    MessageDeleteStart,
    messageDeleteSuccess,
    messageFetchAllFailed,
    messageFetchAllSuccess,
    messageFetchSingleFailed,
    MessageFetchSingleStart,
    messageFetchSingleSuccess,
    messageFetchUserMessagesFailed,
    messageFetchUserMessagesSuccess,
    MessageSetID,
    messageSetIdSuccess,
    MessageUpdateStart,
    messageUpdateSuccess
} from './message.action';

import {
    addMessage,
    deleteMessage,
    editMessage,
    getAllMessages,
    getSingleMessage,
    getUsersMessages
} from '../../utils/api/message.api';

export function* startSetId({ payload: { messageId }}: MessageSetID) {
    yield* put(messageSetIdSuccess(messageId));
}

export function* createMessage({ payload: { messageValue, receiverId }}: MessageCreateStart ) {
    try {
        const message = yield* call(
            addMessage,
            messageValue,
            receiverId
        ); 
        yield* put(messageCreateSuccess(message));
    } catch (error) {
        yield* put(messageCreateFailed(error as Error));
    }
}

export function* updateMessage({ payload: { messageId, messageValue }}: MessageUpdateStart) {
    try {
        const message = yield* call(
            editMessage,
            messageId,
            messageValue
        ); 
        yield* put(messageUpdateSuccess(message));
    } catch (error) {
        yield* put(messageCreateFailed(error as Error));
    }
}

export function* removeMessage({ payload: { messageId }}: MessageDeleteStart) {
    try {
        const messages = yield* call(
            deleteMessage,
            messageId
        ); 
        yield* put(messageDeleteSuccess(messages));
    } catch (error) {
        yield* put(messageDeleteFailed(error as Error));
    }
}

export function* fetchUserMessages() {
    try {
        const messages = yield* call(getUsersMessages);
        yield* put(messageFetchUserMessagesSuccess(messages));
    } catch (error) {
        yield* put(messageFetchUserMessagesFailed(error as Error));
    }
}

export function* fetchSingleMessageAsync({ 
    payload: { messageId } }: MessageFetchSingleStart) {
    try {
        const messageSnapshot = yield* call(
            getSingleMessage,
            messageId 
        );
        yield* put(messageFetchSingleSuccess(messageSnapshot as Message));
    } catch (error) {
        yield* put(messageFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMessagesAsync() {
    try {
        const messages = yield* call(getAllMessages);
        yield* put(messageFetchAllSuccess(messages));
    } catch (error) {
        yield* put(messageFetchAllFailed(error as Error));
    }
}

export function* onSetId() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.SET_ID,
        startSetId
    );
}

export function* onCreateStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.CREATE_START, 
        createMessage
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.UPDATE_START, 
        updateMessage
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.DELETE_START, 
        removeMessage
    );
}

export function* onFetchUserMessagesStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START, 
        fetchUserMessages
    );
}

export function* onFetchSingleMessageStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMessageAsync
    );
}
  
export function* onFetchMessagesStart() {
    yield* takeLatest(
        MESSAGE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMessagesAsync
    );
}

export function* messageSagas() {
    yield* all([
        call(onSetId),
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserMessagesStart),
        call(onFetchSingleMessageStart),
        call(onFetchMessagesStart)
    ]);
}
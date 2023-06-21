import { takeLatest, put, all, call } from 'typed-redux-saga';

import { MessageComment, MESSAGECOMMENT_ACTION_TYPES } from './messagecomment.types';

import {
    messagecommentCreateStart,
    messagecommentCreateSuccess,
    messagecommentCreateFailed,
    messagecommentUpdateStart,
    messagecommentUpdateSuccess,
    messagecommentUpdateFailed,
    messagecommentDeleteStart,
    messagecommentDeleteSuccess,
    messagecommentDeleteFailed,
    messagecommentFetchSingleStart,
    messagecommentFetchSingleSuccess,
    messagecommentFetchSingleFailed,
    messagecommentFetchAllStart,
    messagecommentFetchAllSuccess,
    messagecommentFetchAllFailed,
    MessageCommentCreateStart,
    MessageCommentCreateSuccess,
    MessageCommentFetchAllStart,
    MessageCommentFetchSingleStart,
    MessageCommentFetchUserMessagesStart,
    MessageCommentUpdateStart,
    MessageCommentDeleteStart
} from './messagecomment.action';

import { 
    getSingleMessageComment,
    getAllMessageComments,
    getUserMessageComments,
    getUsersMessageComments,
    getMessageComments, 
    addMessageComment, 
    editMessageComment,
    deleteMessageComment
} from '../../utils/api/messagecomment.api';

export function* createMessageComment({ payload: { messageId, messageValue, imageFile }}: MessageCommentCreateStart ) {
    try {
        const messagecomment = yield* call(
            addMessageComment,
            messageId,
            messageValue,
            imageFile
        ); 
        yield* put(messagecommentCreateSuccess(messagecomment));
    } catch (error) {
        yield* put(messagecommentCreateFailed(error as Error));
    }
}

export function* updateMessageComment({ payload: { messageCommentId, messageValue, mediaLink }}: MessageCommentUpdateStart) {
    try {
        const messagecomment = yield* call(
            editMessageComment,
            messageCommentId,
            messageValue,
            mediaLink
        ); 
        yield* put(messagecommentUpdateSuccess(messagecomment));
    } catch (error) {
        yield* put(messagecommentCreateFailed(error as Error));
    }
}

export function* removeMessageComment({ payload: { messageCommentId }}: MessageCommentDeleteStart) {
    try {
        const messages = yield* call(
            deleteMessageComment,
            messageCommentId
        ); 
        yield* put(messagecommentDeleteSuccess(messages));
    } catch (error) {
        yield* put(messagecommentDeleteFailed(error as Error));
    }
}

export function* fetchUserMessageComments() {
    try {
        const messagecomment = yield* call(getUsersMessageComments);
        if (!messagecomment) return;
        yield* call(messagecommentFetchAllSuccess, messagecomment);
    } catch (error) {
        yield* put(messagecommentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersMessageComments({ payload: { userId } }: MessageCommentFetchUserMessagesStart) {
    try {
        const messagecomments = yield* call(
            getUserMessageComments,
            userId
        );
        if (!messagecomments) return;
        yield* call(messagecommentFetchAllSuccess, messagecomments);
    } catch (error) {
        yield* put(messagecommentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleMessageAsync({ 
    payload: { messageId } }: MessageCommentFetchSingleStart) {
    try {
        const messageSnapshot = yield* call(
            getSingleMessageComment,
            messageId 
        );
        yield* put(messagecommentFetchSingleSuccess(messageSnapshot));
    } catch (error) {
        yield* put(messagecommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMessagesAsync() {
    try {
        const messagecomments = yield* call(getAllMessageComments);
        yield* put(messagecommentFetchAllSuccess(messagecomments));
    } catch (error) {
        yield* put(messagecommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.CREATE_START, 
        createMessageComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.UPDATE_START, 
        updateMessageComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.DELETE_START, 
        removeMessageComment
    );
}

export function* onFetchUserMessagesStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_START, 
        fetchUserMessageComments
    );
}

export function* onFetchSingleMessageStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMessageAsync
    );
}
  
export function* onFetchMessagesStart() {
    yield* takeLatest(
        MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMessagesAsync
    );
}

export function* messageCommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserMessagesStart),
        call(onFetchSingleMessageStart),
        call(onFetchMessagesStart)
    ]);
}
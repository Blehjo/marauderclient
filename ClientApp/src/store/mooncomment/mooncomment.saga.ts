import { takeLatest, put, all, call } from 'typed-redux-saga';

import { MoonComment, MOON_COMMENT_ACTION_TYPES } from './mooncomment.types';

import {
    moonCommentCreateStart,
    moonCommentCreateSuccess,
    moonCommentCreateFailed,
    moonCommentUpdateStart,
    moonCommentUpdateSuccess,
    moonCommentUpdateFailed,
    moonCommentDeleteStart,
    moonCommentDeleteSuccess,
    moonCommentDeleteFailed,
    moonCommentFetchSingleStart,
    moonCommentFetchSingleSuccess,
    moonCommentFetchSingleFailed,
    moonCommentFetchAllStart,
    moonCommentFetchAllSuccess,
    moonCommentFetchAllFailed,
    MoonCommentCreateStart,
    MoonCommentCreateSuccess,
    MoonCommentFetchAllStart,
    MoonCommentFetchSingleStart,
    MoonCommentFetchUserChatsStart,
    MoonCommentUpdateStart,
    MoonCommentDeleteStart
} from './mooncomment.action';

import { 
    getSingleComment,
    getAllComments,
    getUserComments,
    getUsersComments,
    getComments, 
    addComment, 
    editComment,
    deleteComment
} from '../../utils/api/mooncomment.api';

export function* createMoonComment({ payload: { commentValue, imageFile, moonId }}: MoonCommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            moonId,
            formData
        ); 
        yield* put(moonCommentCreateSuccess(comments));
    } catch (error) {
        yield* put(moonCommentCreateFailed(error as Error));
    }
}

export function* updateMoonComment({ payload: { moonCommentId, commentValue, mediaLink }}: MoonCommentUpdateStart) {
    try {
        const comment = yield* call(
            editComment,
            moonCommentId,
            commentValue,
            mediaLink
        ); 
        yield* put(moonCommentUpdateSuccess(comment));
    } catch (error) {
        yield* put(moonCommentCreateFailed(error as Error));
    }
}

export function* removeMoonComment({ payload: { moonCommentId }}: MoonCommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            moonCommentId
        ); 
        yield* put(moonCommentDeleteSuccess(comments));
    } catch (error) {
        yield* put(moonCommentDeleteFailed(error as Error));
    }
}

export function* fetchUserMoonComments() {
    try {
        const comment  = yield* call(getUsersComments);
        if (!comment) return;
        yield* put(moonCommentFetchAllSuccess(comment));
    } catch (error) {
        yield* put(moonCommentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersMoonComments({ payload: { userId } }: MoonCommentFetchUserChatsStart) {
    try {
        const comments = yield* call(
            getUserComments,
            userId
        );
        if (!comments) return;
        yield* put(moonCommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(moonCommentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleMoonCommentAsync({ 
    payload: { moonCommentId } }: MoonCommentFetchSingleStart) {
    try {
        const commentSnapshot = yield* call(
            getSingleComment,
            moonCommentId 
        );
        yield* put(moonCommentFetchSingleSuccess(commentSnapshot));
    } catch (error) {
        yield* put(moonCommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMoonCommentsAsync() {
    try {
        const comments = yield* call(getAllComments);
        yield* put(moonCommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(moonCommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.CREATE_START, 
        createMoonComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.UPDATE_START, 
        updateMoonComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.DELETE_START, 
        removeMoonComment
    );
}

export function* onFetchUserMoonCommentsStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, 
        fetchUserMoonComments
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMoonCommentAsync
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        MOON_COMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMoonCommentsAsync
    );
}

export function* moonCommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserMoonCommentsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
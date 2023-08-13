import { all, call, put, takeLatest } from 'typed-redux-saga';

import { COMMENT_ACTION_TYPES } from './gltfcomment.types';

import {
    commentCreateFailed,
    CommentCreateStart,
    commentCreateSuccess,
    commentDeleteFailed,
    CommentDeleteStart,
    commentDeleteSuccess,
    commentFetchAllFailed,
    commentFetchAllSuccess,
    commentFetchSingleFailed,
    CommentFetchSingleStart,
    commentFetchSingleSuccess,
    CommentFetchUserChatsStart,
    CommentUpdateStart,
    commentUpdateSuccess
} from './gltfcomment.action';

import {
    addComment,
    deleteComment,
    editComment,
    getAllComments,
    getSingleComment,
    getUserComments,
    getUsersComments
} from '../../utils/api/gltfcomment.api';

export function* createComment({ payload: { commentValue, imageFile, gltfId }}: CommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            gltfId,
            formData
        ); 
        yield* put(commentCreateSuccess(comments));
    } catch (error) {
        yield* put(commentCreateFailed(error as Error));
    }
}

export function* updateComment({ payload: { gltfCommentId, commentValue, mediaLink }}: CommentUpdateStart) {
    try {
        const comment = yield* call(
            editComment,
            gltfCommentId,
            commentValue,
            mediaLink
        ); 
        yield* put(commentUpdateSuccess(comment));
    } catch (error) {
        yield* put(commentCreateFailed(error as Error));
    }
}

export function* removeComment({ payload: { gltfCommentId }}: CommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            gltfCommentId
        ); 
        yield* put(commentDeleteSuccess(comments));
    } catch (error) {
        yield* put(commentDeleteFailed(error as Error));
    }
}

export function* fetchUserComments() {
    try {
        const comment  = yield* call(getUsersComments);
        if (!comment) return;
        yield* put(commentFetchAllSuccess(comment));
    } catch (error) {
        yield* put(commentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUserss({ payload: { userId } }: CommentFetchUserChatsStart) {
    try {
        const comments = yield* call(
            getUserComments,
            userId
        );
        if (!comments) return;
        yield* put(commentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(commentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleCommentAsync({ 
    payload: { gltfCommentId } }: CommentFetchSingleStart) {
    try {
        const commentSnapshot = yield* call(
            getSingleComment,
            gltfCommentId 
        );
        yield* put(commentFetchSingleSuccess(commentSnapshot));
    } catch (error) {
        yield* put(commentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllCommentsAsync() {
    try {
        const comments = yield* call(getAllComments);
        yield* put(commentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(commentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.CREATE_START, 
        createComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.UPDATE_START, 
        updateComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.DELETE_START, 
        removeComment
    );
}

export function* onFetchUserCommentsStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, 
        fetchUserComments
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleCommentAsync
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        COMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllCommentsAsync
    );
}

export function* gltfCommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserCommentsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
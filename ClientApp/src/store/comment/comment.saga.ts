import { takeLatest, put, all, call } from 'typed-redux-saga';

import { Comment, COMMENT_ACTION_TYPES } from './comment.types';

import {
    commentCreateStart,
    commentCreateSuccess,
    commentCreateFailed,
    commentUpdateStart,
    commentUpdateSuccess,
    commentUpdateFailed,
    commentDeleteStart,
    commentDeleteSuccess,
    commentDeleteFailed,
    commentFetchSingleStart,
    commentFetchSingleSuccess,
    commentFetchSingleFailed,
    commentFetchAllStart,
    commentFetchAllSuccess,
    commentFetchAllFailed,
    CommentCreateStart,
    CommentCreateSuccess,
    CommentFetchAllStart,
    CommentFetchSingleStart,
    CommentFetchUserChatsStart,
    CommentUpdateStart,
    CommentDeleteStart
} from './comment.action';

import { 
    getSingleComment,
    getAllComments,
    getUserComments,
    getUsersComments,
    getComments, 
    addComment, 
    editComment,
    deleteComment
} from '../../utils/api/comment.api';

export function* createComment({ payload: { commentValue, imageFile, postId }}: CommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            postId,
            formData
        ); 
        yield* put(commentCreateSuccess(comments));
    } catch (error) {
        yield* put(commentCreateFailed(error as Error));
    }
}

export function* updateComment({ payload: { commentId, commentValue, mediaLink }}: CommentUpdateStart) {
    try {
        const comment = yield* call(
            editComment,
            commentId,
            commentValue,
            mediaLink
        ); 
        yield* put(commentUpdateSuccess(comment));
    } catch (error) {
        yield* put(commentCreateFailed(error as Error));
    }
}

export function* removeComment({ payload: { commentId }}: CommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            commentId
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
    payload: { commentId } }: CommentFetchSingleStart) {
    try {
        const commentSnapshot = yield* call(
            getSingleComment,
            commentId 
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

export function* commentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserCommentsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
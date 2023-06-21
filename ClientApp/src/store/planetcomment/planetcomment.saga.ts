import { takeLatest, put, all, call } from 'typed-redux-saga';

import { PlanetComment, PLANET_COMMENT_ACTION_TYPES } from './planetcomment.types';

import {
    planetcommentCreateStart,
    planetcommentCreateSuccess,
    planetcommentCreateFailed,
    planetcommentUpdateStart,
    planetcommentUpdateSuccess,
    planetcommentUpdateFailed,
    planetcommentDeleteStart,
    planetcommentDeleteSuccess,
    planetcommentDeleteFailed,
    planetcommentFetchSingleStart,
    planetcommentFetchSingleSuccess,
    planetcommentFetchSingleFailed,
    planetcommentFetchAllStart,
    planetcommentFetchAllSuccess,
    planetcommentFetchAllFailed,
    PlanetCommentCreateStart,
    PlanetCommentCreateSuccess,
    PlanetCommentFetchAllStart,
    PlanetCommentFetchSingleStart,
    PlanetCommentFetchUserChatsStart,
    PlanetCommentUpdateStart,
    PlanetCommentDeleteStart
} from './planetcomment.action';

import { 
    getSingleComment,
    getAllComments,
    getUserComments,
    getUsersComments,
    getComments, 
    addComment, 
    editComment,
    deleteComment
} from '../../utils/api/planetcomment.api';

export function* createComment({ payload: { commentValue, imageFile, planetId }}: PlanetCommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            planetId,
            formData
        ); 
        yield* put(planetcommentCreateSuccess(comments));
    } catch (error) {
        yield* put(planetcommentCreateFailed(error as Error));
    }
}

export function* updateComment({ payload: { planetCommentId, commentValue, mediaLink }}: PlanetCommentUpdateStart) {
    try {
        const comment = yield* call(
            editComment,
            planetCommentId,
            commentValue,
            mediaLink
        ); 
        yield* put(planetcommentUpdateSuccess(comment));
    } catch (error) {
        yield* put(planetcommentCreateFailed(error as Error));
    }
}

export function* removeComment({ payload: { commentId }}: PlanetCommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            commentId
        ); 
        yield* put(planetcommentDeleteSuccess(comments));
    } catch (error) {
        yield* put(planetcommentDeleteFailed(error as Error));
    }
}

export function* fetchUserComments() {
    try {
        const comment  = yield* call(getUsersComments);
        if (!comment) return;
        yield* put(planetcommentFetchAllSuccess(comment));
    } catch (error) {
        yield* put(planetcommentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUserss({ payload: { userId } }: PlanetCommentFetchUserChatsStart) {
    try {
        const comments = yield* call(
            getUserComments,
            userId
        );
        if (!comments) return;
        yield* put(planetcommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(planetcommentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleCommentAsync({ 
    payload: { commentId } }: PlanetCommentFetchSingleStart) {
    try {
        const commentSnapshot = yield* call(
            getSingleComment,
            commentId 
        );
        yield* put(planetcommentFetchSingleSuccess(commentSnapshot));
    } catch (error) {
        yield* put(planetcommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllCommentsAsync() {
    try {
        const comments = yield* call(getAllComments);
        yield* put(planetcommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(planetcommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.CREATE_START, 
        createComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.UPDATE_START, 
        updateComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.DELETE_START, 
        removeComment
    );
}

export function* onFetchUserCommentsStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, 
        fetchUserComments
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleCommentAsync
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        PLANET_COMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllCommentsAsync
    );
}

export function* planetcommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserCommentsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
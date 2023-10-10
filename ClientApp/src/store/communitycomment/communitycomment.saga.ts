import { all, call, put, takeLatest } from 'typed-redux-saga';

import { COMMUNITY_COMMENT_ACTION_TYPES } from './communitycomment.types';

import {
    communityCommentCreateFailed,
    CommunityCommentCreateStart,
    communityCommentCreateSuccess,
    communityCommentDeleteFailed,
    CommunityCommentDeleteStart,
    communityCommentDeleteSuccess,
    communityCommentFetchAllFailed,
    communityCommentFetchAllSuccess,
    communityCommentFetchSingleFailed,
    CommunityCommentFetchSingleStart,
    communityCommentFetchSingleSuccess,
    CommunityCommentFetchUserChatsStart,
    CommunityCommentUpdateStart,
    communityCommentUpdateSuccess
} from './communitycomment.action';

import {
    addComment,
    deleteComment,
    editComment,
    getAllComments,
    getSingleComment,
    getUserComments,
    getUsersComments
} from '../../utils/api/communitycomment.api';

export function* createComment({ payload: { commentValue, imageFile, postId }}: CommunityCommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            postId,
            formData
        ); 
        yield* put(communityCommentCreateSuccess(comments));
    } catch (error) {
        yield* put(communityCommentCreateFailed(error as Error));
    }
}

export function* updateComment({ payload: { commentId, commentValue, mediaLink }}: CommunityCommentUpdateStart) {
    try {
        const comment = yield* call(
            editComment,
            commentId,
            commentValue,
            mediaLink
        ); 
        yield* put(communityCommentUpdateSuccess(comment));
    } catch (error) {
        yield* put(communityCommentCreateFailed(error as Error));
    }
}

export function* removeComment({ payload: { commentId }}: CommunityCommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            commentId
        ); 
        yield* put(communityCommentDeleteSuccess(comments));
    } catch (error) {
        yield* put(communityCommentDeleteFailed(error as Error));
    }
}

export function* fetchUserComments() {
    try {
        const comment  = yield* call(getUsersComments);
        if (!comment) return;
        yield* put(communityCommentFetchAllSuccess(comment));
    } catch (error) {
        yield* put(communityCommentFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUserss({ payload: { userId } }: CommunityCommentFetchUserChatsStart) {
    try {
        const comments = yield* call(
            getUserComments,
            userId
        );
        if (!comments) return;
        yield* put(communityCommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(communityCommentFetchAllFailed(error as Error));
    }
}

export function* fetchSingleCommentAsync({ 
    payload: { commentId } }: CommunityCommentFetchSingleStart) {
    try {
        const commentSnapshot = yield* call(
            getSingleComment,
            commentId 
        );
        yield* put(communityCommentFetchSingleSuccess(commentSnapshot));
    } catch (error) {
        yield* put(communityCommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllCommentsAsync() {
    try {
        const comments = yield* call(getAllComments);
        yield* put(communityCommentFetchAllSuccess(comments));
    } catch (error) {
        yield* put(communityCommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.CREATE_START, 
        createComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.UPDATE_START, 
        updateComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.DELETE_START, 
        removeComment
    );
}

export function* onFetchUserCommentsStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.FETCH_USER_COMMENTS_START, 
        fetchUserComments
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleCommentAsync
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        COMMUNITY_COMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllCommentsAsync
    );
}

export function* communityCommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserCommentsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
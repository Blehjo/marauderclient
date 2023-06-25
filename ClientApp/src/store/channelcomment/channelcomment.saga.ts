import { all, call, put, takeLatest } from 'typed-redux-saga';

import { CHANNEL_COMMENT_ACTION_TYPES } from './channelcomment.types';

import {
    addComment,
    deleteComment,
    editComment,
    getAllComments,
    getSingleComment
} from '../../utils/api/channelcomment.api';
import { ChannelFetchSingleStart } from '../channel/channel.action';
import { ChannelCommentCreateStart, ChannelCommentDeleteStart, ChannelCommentFetchSingleStart, ChannelCommentUpdateStart, channelcommentCreateFailed, channelcommentDeleteFailed, channelcommentDeleteSuccess, channelcommentFetchAllFailed, channelcommentFetchSingleFailed, channelcommentFetchSingleSuccess, channelcommentUpdateFailed, channelcommentUpdateSuccess } from './channelcomment.action';

export function* createComment({ payload: { channelId, commentValue, imageFile }}: ChannelCommentCreateStart ) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comments = yield* call(
            addComment,
            channelId,
            formData
        ); 
        yield* put(channelcommentFetchSingleSuccess(comments));
    } catch (error) {
        yield* put(channelcommentCreateFailed(error as Error));
    }
}

export function* updateComment({ payload: { channelCommentId, commentValue, imageFile }}: ChannelCommentUpdateStart) {
    const formData = new FormData();
    formData.append('commentValue', commentValue);
    formData.append('imageFile', imageFile);
    try {
        const comment = yield* call(
            editComment,
            channelCommentId,
            formData
        ); 
        yield* put(channelcommentUpdateSuccess(comment));
    } catch (error) {
        yield* put(channelcommentUpdateFailed(error as Error));
    }
}

export function* removeComment({ payload: { commentId }}: ChannelCommentDeleteStart) {
    try {
        const comments = yield* call(
            deleteComment,
            commentId
        ); 
        yield* put(channelcommentDeleteSuccess(comments));
    } catch (error) {
        yield* put(channelcommentDeleteFailed(error as Error));
    }
}

export function* fetchSingleComment({ 
    payload: { commentId } }: ChannelCommentFetchSingleStart) {
    try {
        const comment = yield* call(
            getSingleComment,
            commentId 
        );
        yield* put(channelcommentFetchSingleSuccess(comment));
    } catch (error) {
        yield* put(channelcommentFetchSingleFailed(error as Error));
    }
}

export function* fetchAllComments({ payload: { channelId } }: ChannelFetchSingleStart) {
    try {
        const comments = yield* call(getAllComments, channelId);
        yield* put(channelcommentFetchSingleSuccess(comments));
    } catch (error) {
        yield* put(channelcommentFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        CHANNEL_COMMENT_ACTION_TYPES.CREATE_START, 
        createComment
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        CHANNEL_COMMENT_ACTION_TYPES.UPDATE_START, 
        updateComment
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        CHANNEL_COMMENT_ACTION_TYPES.DELETE_START, 
        removeComment
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        CHANNEL_COMMENT_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleComment
    );
}
  
export function* onFetchStart() {
    yield* takeLatest(
        CHANNEL_COMMENT_ACTION_TYPES.FETCH_ALL_START,
        fetchAllComments
    );
}

export function* channelcommentSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchStart)
    ]);
}
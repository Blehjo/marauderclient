import { all, call, put, takeLatest } from 'typed-redux-saga';

import { Post, POST_ACTION_TYPES } from './post.types';

import {
    postCreateFailed,
    PostCreateStart,
    postCreateSuccess,
    postDeleteFailed,
    PostDeleteStart,
    postDeleteSuccess,
    postFetchAllFailed,
    postFetchAllSuccess,
    postFetchSingleFailed,
    PostFetchSingleStart,
    postFetchSingleSuccess,
    postFetchUserPostsFailed,
    PostFetchUserPostsStart,
    postFetchUserPostsSuccess,
    PostUpdateStart,
    postUpdateSuccess
} from './post.action';

import {
    addPost,
    deletePost,
    editPost,
    getAllPosts,
    getSinglePost,
    getUserPosts,
    getUsersPosts
} from '../../utils/api/post.api';

export function* createPost({ payload: { postValue, mediaLink, imageFile }}: PostCreateStart) {
    const formData = new FormData();
    formData.append('postValue', postValue);
    formData.append('mediaLink', mediaLink);
    formData.append('imageFile', imageFile);
    try {
        const post = yield* call(
            addPost,
            formData
        ); 
        yield* put(postCreateSuccess(post));
    } catch (error) {
        yield* put(postCreateFailed(error as Error));
    }
}

export function* updatePost({ payload: { postId, postValue, mediaLink, imageFile }}: PostUpdateStart) {
    const formData = new FormData();
    formData.append('postValue', postValue);
    formData.append('mediaLink', mediaLink);
    formData.append('imageFile', imageFile);
    try {
        const post = yield* call(
            editPost,
            postId,
            formData
        ); 
        yield* put(postUpdateSuccess(post));
    } catch (error) {
        yield* put(postCreateFailed(error as Error));
    }
}

export function* removePost({ payload: { postId }}: PostDeleteStart) {
    try {
        const posts = yield* call(
            deletePost,
            postId
        ); 
        yield* put(postDeleteSuccess(posts));
    } catch (error) {
        yield* put(postDeleteFailed(error as Error));
    }
}

export function* fetchUserPosts() {
    try {
        const post = yield* call(getUsersPosts);
        if (!post) return;
        yield* put(postFetchUserPostsSuccess(post));
    } catch (error) {
        yield* put(postFetchUserPostsFailed(error as Error));
    }
}

export function* fetchOtherUsersPosts({ payload: { userId } }: PostFetchUserPostsStart) {
    try {
        const posts = yield* call(
            getUserPosts,
            userId
        );
        if (!posts) return;
        yield* put(postFetchUserPostsSuccess(posts));
    } catch (error) {
        yield* put(postFetchUserPostsFailed(error as Error));
    }
}

export function* fetchSinglePostAsync({ 
    payload: { postId } }: PostFetchSingleStart) {
    try {
        const postSnapshot = yield* call(
            getSinglePost,
            postId 
        );
        yield* put(postFetchSingleSuccess(postSnapshot as Post));
    } catch (error) {
        yield* put(postFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPostsAsync() {
    try {
        const posts = yield* call(getAllPosts);
        yield* put(postFetchAllSuccess(posts));
    } catch (error) {
        yield* put(postFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.CREATE_START, 
        createPost
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.UPDATE_START, 
        updatePost
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.DELETE_START, 
        removePost
    );
}

export function* onFetchUserPostsStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_USER_POSTS_START, 
        fetchUserPosts
    );
}

export function* onFetchOtherUsersPostsStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_USER_POSTS_START, 
        fetchOtherUsersPosts
    );
}

export function* onFetchSinglePostStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePostAsync
    );
}
  
export function* onFetchPostsStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPostsAsync
    );
}

export function* postSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserPostsStart),
        call(onFetchOtherUsersPostsStart),
        call(onFetchSinglePostStart),
        call(onFetchPostsStart)
    ]);
}
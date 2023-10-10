import { all, call, put, takeLatest } from 'typed-redux-saga';

import { CommunityPost, COMMUNITY_POST_ACTION_TYPES } from './communitypost.types';

import {
    communityPostCreateFailed,
    CommunityPostCreateStart,
    communityPostCreateStart,
    communityPostCreateSuccess,
    communityPostDeleteFailed,
    CommunityPostDeleteStart,
    communityPostDeleteStart,
    communityPostDeleteSuccess,
    communityPostFetchAllFailed,
    communityPostFetchAllSuccess,
    communityPostFetchSingleFailed,
    CommunityPostFetchSingleStart,
    communityPostFetchSingleStart,
    communityPostFetchSingleSuccess,
    communityPostFetchUserPostsFailed,
    CommunityPostFetchUserPostsStart,
    communityPostFetchUserPostsStart,
    communityPostFetchUserPostsSuccess,
    CommunityPostUpdateStart,
    communityPostUpdateSuccess
} from './communitypost.action';

import {
    addPost,
    deletePost,
    editPost,
    getAllPosts,
    getSinglePost,
    getUserPosts,
    getUsersPosts
} from '../../utils/api/communitypost.api';

export function* createPost({ payload: { postValue, mediaLink, imageFile }}: CommunityPostCreateStart) {
    const formData = new FormData();
    formData.append('postValue', postValue);
    formData.append('mediaLink', mediaLink);
    formData.append('imageFile', imageFile);
    try {
        const post = yield* call(
            addPost,
            formData
        ); 
        yield* put(communityPostCreateSuccess(post));
    } catch (error) {
        yield* put(communityPostCreateFailed(error as Error));
    }
}

export function* updatePost({ payload: { postId, postValue, mediaLink, imageFile }}: CommunityPostUpdateStart) {
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
        yield* put(communityPostUpdateSuccess(post));
    } catch (error) {
        yield* put(communityPostCreateFailed(error as Error));
    }
}

export function* removePost({ payload: { postId }}: CommunityPostDeleteStart) {
    try {
        const posts = yield* call(
            deletePost,
            postId
        ); 
        yield* put(communityPostDeleteSuccess(posts));
    } catch (error) {
        yield* put(communityPostDeleteFailed(error as Error));
    }
}

export function* fetchUserPosts() {
    try {
        const post = yield* call(getUsersPosts);
        if (!post) return;
        yield* put(communityPostFetchUserPostsSuccess(post));
    } catch (error) {
        yield* put(communityPostFetchUserPostsFailed(error as Error));
    }
}

export function* fetchOtherUsersPosts({ payload: { userId } }: CommunityPostFetchUserPostsStart) {
    try {
        const posts = yield* call(
            getUserPosts,
            userId!
        );
        if (!posts) return;
        yield* put(communityPostFetchUserPostsSuccess(posts));
    } catch (error) {
        yield* put(communityPostFetchUserPostsFailed(error as Error));
    }
}

export function* fetchSinglePostAsync({ 
    payload: { postId } }: CommunityPostFetchSingleStart) {
    try {
        const postSnapshot = yield* call(
            getSinglePost,
            postId 
        );
        yield* put(communityPostFetchSingleSuccess(postSnapshot as CommunityPost));
    } catch (error) {
        yield* put(communityPostFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPostsAsync() {
    try {
        const posts = yield* call(getAllPosts);
        yield* put(communityPostFetchAllSuccess(posts));
    } catch (error) {
        yield* put(communityPostFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.CREATE_START, 
        createPost
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.UPDATE_START, 
        updatePost
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.DELETE_START, 
        removePost
    );
}

export function* onFetchUserPostsStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_START, 
        fetchUserPosts
    );
}

export function* onFetchOtherUsersPostsStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.FETCH_USER_POSTS_START, 
        fetchOtherUsersPosts
    );
}

export function* onFetchSinglePostStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePostAsync
    );
}
  
export function* onFetchPostsStart() {
    yield* takeLatest(
        COMMUNITY_POST_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPostsAsync
    );
}

export function* communityPostSagas() {
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
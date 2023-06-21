import { takeLatest, put, all, call } from 'typed-redux-saga';

import { FOLLOWER_ACTION_TYPES } from './follower.types';

import {
    followerCreateStart,
    followerCreateSuccess,
    followerCreateFailed,
    followerUpdateStart,
    followerUpdateSuccess,
    followerUpdateFailed,
    followerDeleteStart,
    followerDeleteSuccess,
    followerDeleteFailed,
    followerFetchSingleStart,
    followerFetchSingleSuccess,
    followerFetchSingleFailed,
    followerFetchAllStart,
    followerFetchAllSuccess,
    followerFetchAllFailed,
    FollowerCreateStart,
    FollowerDeleteStart,
    FollowerFetchAllStart,
} from './follower.action';

import { 
    getSingleFollower,
    getUserFollowers,
    getFollowers, 
    addFollower, 
    deleteFollower
} from '../../utils/api/follower.api';

export function* fetchFollowersAsync({ payload: { userId }}: FollowerFetchAllStart) {
    try {
      const followers = yield* call(
        getFollowers, 
        userId
        );
      yield* put(followerFetchAllSuccess(followers));
    } catch (error) {
      yield* put(followerFetchAllFailed(error as Error));
    }
}

export function* createFollower({ payload: { followerUser }}: FollowerCreateStart ) {
    try {
        const follower = yield* call(
            addFollower,
            followerUser
        )
        if (!follower) return;
        yield* put(followerCreateSuccess(follower));
    } catch (error) {
        yield* put(followerCreateFailed(error as Error));
    }
}

export function* removeFollower({ payload: { followerId }}: FollowerDeleteStart) {
    try {
        const follower = yield* call(
            deleteFollower,
            followerId
        )
        if (!follower) return;
        yield* put(followerDeleteSuccess(follower));
    } catch (error) {
        yield* put(followerDeleteFailed(error as Error))
    }
}

export function* onStart() {
    yield takeLatest(FOLLOWER_ACTION_TYPES.CREATE_START, createFollower);
}

export function* onDelete() {
    yield takeLatest(FOLLOWER_ACTION_TYPES.CREATE_START, removeFollower);
}

export function* onFetch() {
    yield takeLatest(FOLLOWER_ACTION_TYPES.FETCH_ALL_START, fetchFollowersAsync);
}

export function* followerSagas() {
    yield all([
        call(onStart),
        call(onDelete),
        call(onFetch)
    ]);
}
import { AnyAction } from 'redux';

import { Follower } from './follower.types';

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
} from './follower.action';

export type FollowerState = {
    readonly followerId: number | null;
    readonly singleFollower: Follower | null;
    readonly userFollowers: Follower[] | null;
    readonly followers: Follower[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: FollowerState = {
    followerId: null,
    singleFollower: null,
    userFollowers: [],
    followers: [],
    isLoading: false,
    error: null
};

export const followerReducer = (
    state = INITIAL_STATE, action: AnyAction
): FollowerState => {
    if (
        followerFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        followerFetchSingleStart.match(action)
    ) {
        return { ...state, isLoading: true, followerId: action.payload };
    }  
    if (
        followerCreateSuccess.match(action) ||
        followerUpdateSuccess.match(action) ||
        followerDeleteSuccess.match(action) ||
        followerFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, followers: action.payload };
    } 
    if (
        followerCreateFailed.match(action) ||
        followerUpdateFailed.match(action) ||
        followerDeleteFailed.match(action) ||
        followerFetchSingleFailed.match(action) ||
        followerFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
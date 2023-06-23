import { AnyAction } from 'redux';

import { Community } from './community.types';

import {
    communityCreateFailed,
    communityCreateStart,
    communityCreateSuccess,
    communityDeleteFailed,
    communityDeleteSuccess,
    communityFetchAllFailed,
    communityFetchAllStart,
    communityFetchAllSuccess,
    communityFetchOtherUserCommunitiesStart,
    communityFetchOtherUserCommunitiesSuccess,
    communityFetchSingleFailed,
    communityFetchSingleStart,
    communityFetchSingleSuccess,
    communityFetchUserCommunitiesStart,
    communityFetchUserCommunitiesSuccess,
    communityUpdateFailed,
    communityUpdateSuccess
} from './community.action';

export type CommunityState = {
    readonly communityId: number | null;
    readonly singleCommunity: Community | null;
    readonly userCommunities: Community[] | null;
    readonly communities: Community[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CommunityState = {
    communityId: null,
    singleCommunity: null,
    userCommunities: [],
    communities: [],
    isLoading: false,
    error: null
};

export const communityReducer = (
    state = INITIAL_STATE, action: AnyAction
): CommunityState => {
    if (
        communityFetchAllStart.match(action) ||
        communityFetchSingleStart.match(action) ||
        communityFetchUserCommunitiesStart.match(action) ||
        communityFetchOtherUserCommunitiesStart.match(action) ||
        communityCreateStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        communityFetchUserCommunitiesSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userCommunities: action.payload }
    }
    if (
        communityUpdateSuccess.match(action) ||
        communityFetchSingleSuccess.match(action)
    ) {
        return { ...state, isLoading: false, singleCommunity: action.payload }
    }
    if (
        communityFetchAllSuccess.match(action) || 
        communityFetchOtherUserCommunitiesSuccess.match(action)
    ) {
        return { ...state, isLoading: false, communities: action.payload };
    } 
    if (
        communityCreateSuccess.match(action) ||
        communityDeleteSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userCommunities: action.payload };
    } 
    if (
        communityCreateFailed.match(action) ||
        communityUpdateFailed.match(action) ||
        communityDeleteFailed.match(action) ||
        communityFetchSingleFailed.match(action) ||
        communityFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
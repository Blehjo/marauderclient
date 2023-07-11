import { all, call, put, takeLatest } from 'typed-redux-saga';

import { COMMUNITY_ACTION_TYPES, Community } from './community.types';

import {
    CommunityCreateStart, CommunityDeleteStart, CommunityFetchOtherUsercommunitiesStart, CommunityFetchSingleStart, CommunityUpdateStart, communityCreateFailed, communityCreateSuccess, communityDeleteFailed, communityDeleteSuccess, communityFetchAllFailed, communityFetchAllSuccess, communityFetchOtherUsercommunitiesFailed, communityFetchOtherUsercommunitiesSuccess, communityFetchSingleFailed, communityFetchSingleSuccess, communityFetchUsercommunitiesFailed, communityFetchUsercommunitiesSuccess, communityUpdateSuccess,
} from './community.action';

import {
    addCommunity,
    deleteCommunity,
    editCommunity,
    getAllCommunities,
    getSingleCommunity,
    getUserCommunities,
    getUsersCommunities
} from '../../utils/api/community.api';

export function* createCommunity({ payload: { 
    communityName,
    description,
    mediaLink,
    imageFile
}}: CommunityCreateStart) {
    const formData = new FormData();
    formData.append("communityName", communityName);
    formData.append("description", description);
    formData.append("mediaLink", mediaLink);
    formData.append("imageFile", imageFile);
    try {
        const communities = yield* call(
            addCommunity,
            formData
        ); 
        yield* put(communityCreateSuccess(communities));
    } catch (error) {
        yield* put(communityCreateFailed(error as Error));
    }
}

export function* updateCommunity({ payload: { 
    communityId,
    communityName,
    description,
    imageFile,
}}: CommunityUpdateStart) {
    const formData = new FormData();
    formData.append("communityName", communityName);
    formData.append("description", description);
    formData.append("imageFile", imageFile);
    try {
        const community = yield* call(
            editCommunity,
            communityId,
            formData
        ); 
        yield* put(communityUpdateSuccess(community));
    } catch (error) {
        yield* put(communityCreateFailed(error as Error));
    }
}


export function* removeCommunity({ payload: { communityId }}: CommunityDeleteStart) {
    try {
        const communities = yield* call(
            deleteCommunity,
            communityId
        ); 
        yield* put(communityDeleteSuccess(communities));
    } catch (error) {
        yield* put(communityDeleteFailed(error as Error));
    }
}

export function* fetchUserCommunities() {
    try {
        const planets = yield* call(getUsersCommunities);
        if (!planets) return;
        yield* put(communityFetchUsercommunitiesSuccess(planets));
    } catch (error) {
        yield* put(communityFetchUsercommunitiesFailed(error as Error));
    }
}

export function* fetchOtherUsersCommunities({ payload: { userId } }: CommunityFetchOtherUsercommunitiesStart) {
    try {
        const communities = yield* call(
            getUserCommunities,
            userId
        );
        if (!communities) return;
        yield* put(communityFetchOtherUsercommunitiesSuccess(communities));
    } catch (error) {
        yield* put(communityFetchOtherUsercommunitiesFailed(error as Error));
    }
}

export function* fetchSingleCommunity({ 
    payload: { communityId } }: CommunityFetchSingleStart) {
    try {
        const planetSnapshot = yield* call(
            getSingleCommunity,
            communityId 
        );
        yield* put(communityFetchSingleSuccess(planetSnapshot as Community));
    } catch (error) {
        yield* put(communityFetchSingleFailed(error as Error));
    }
}

export function* fetchAllCommunities() {
    try {
        const planets = yield* call(getAllCommunities);
        yield* put(communityFetchAllSuccess(planets));
    } catch (error) {
        yield* put(communityFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.CREATE_START, 
        createCommunity
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.UPDATE_START, 
        updateCommunity
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.DELETE_START, 
        removeCommunity
    );
}

export function* onFetchUserCommunitiesStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_START, 
        fetchUserCommunities
    );
}

export function* onFetchOtherUserCommunitiesStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_START, 
        fetchOtherUsersCommunities
    );
}

export function* onFetchSingleCommunityStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleCommunity
    );
}
  
export function* onFetchCommunitiesStart() {
    yield* takeLatest(
        COMMUNITY_ACTION_TYPES.FETCH_ALL_START,
        fetchAllCommunities
    );
}

export function* communitySagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserCommunitiesStart),
        call(onFetchOtherUserCommunitiesStart),
        call(onFetchSingleCommunityStart),
        call(onFetchCommunitiesStart)
    ]);
}
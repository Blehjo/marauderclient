import { COMMUNITY_ACTION_TYPES, Community } from './community.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type CommunityCreateStart = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.CREATE_START, { 
        communityName: string, 
        description: string, 
        mediaLink: string,
        imageFile: File  
    }
>;

export type CommunityCreateSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.CREATE_SUCCESS, 
    Community[]
>;

export type CommunityCreateFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type CommunityUpdateStart = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.UPDATE_START, { 
        communityId: number,
        communityName: string, 
        description: string, 
        imageFile: File
    }
>;

export type CommunityUpdateSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.UPDATE_SUCCESS, 
    Community
>;

export type CommunityUpdateFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type CommunityDeleteStart = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.DELETE_START,
    { communityId: number }
>;

export type CommunityDeleteSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.DELETE_SUCCESS, 
    Community[]
>;

export type CommunityDeleteteFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type CommunityFetchSingleStart = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_SINGLE_START,
    { communityId: number }
>;

export type CommunityFetchSingleSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Community
>;

export type CommunityFetchSingleFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type CommunityFetchUsercommunitiesStart = Action<
    COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_START
>;

export type CommunityFetchUsercommunitiesSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_SUCCESS, 
    Community[]
>;

export type CommunityFetchUsercommunitiesFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_FAILED,
    Error
>;

export type CommunityFetchOtherUsercommunitiesStart = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_START,
    { userId: number }
>;

export type CommunityFetchOtherUsercommunitiesSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_SUCCESS, 
    Community[]
>;

export type CommunityFetchOtherUsercommunitiesFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_FAILED,
    Error
>;

export type CommunityFetchAllStart = Action<
    COMMUNITY_ACTION_TYPES.FETCH_ALL_START
>;

export type CommunityFetchAllSuccess = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Community[]
>;

export type CommunityFetchAllFailed = ActionWithPayload<
    COMMUNITY_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const communityCreateStart = withMatcher(
    (   communityName: string, 
        description: string, 
        mediaLink: string,
        imageFile: File  
): CommunityCreateStart => 
    createAction(COMMUNITY_ACTION_TYPES.CREATE_START, {
        communityName, 
        description, 
        mediaLink,
        imageFile 
    })
);

export const communityCreateSuccess = withMatcher(
    (communities: Community[]): CommunityCreateSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.CREATE_SUCCESS, communities)
);

export const communityCreateFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_ACTION_TYPES.CREATE_START, error)
);
 
export const communityUpdateStart = withMatcher(
    (   communityId: number,
        communityName: string, 
        description: string, 
        imageFile: File
): CommunityUpdateStart => 
    createAction(COMMUNITY_ACTION_TYPES.UPDATE_START, {
        communityId,
        communityName, 
        description, 
        imageFile
    })
);

export const communityUpdateSuccess = withMatcher(
    (community: Community): CommunityUpdateSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.UPDATE_SUCCESS, community)
);

export const communityUpdateFailed = withMatcher(
    (error: Error): CommunityUpdateFailed => 
    createAction(COMMUNITY_ACTION_TYPES.UPDATE_FAILED, error)
);

export const communityDeleteStart = withMatcher(
    (communityId: number): CommunityDeleteStart => 
    createAction(COMMUNITY_ACTION_TYPES.DELETE_START, { communityId })
);

export const communityDeleteSuccess = withMatcher(
    (community: Community[]): CommunityDeleteSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.DELETE_SUCCESS, community)
);

export const communityDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(COMMUNITY_ACTION_TYPES.DELETE_START, error)
);

export const communityFetchSingleStart = withMatcher(
    (communityId: number): CommunityFetchSingleStart => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_SINGLE_START, { communityId })
);

export const communityFetchSingleSuccess = withMatcher(
    (community: Community): CommunityFetchSingleSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_SINGLE_SUCCESS, community)
);

export const communityFetchSingleFailed = withMatcher(
    (error: Error): CommunityFetchSingleFailed => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const communityFetchUsercommunitiesStart = withMatcher(
    (): CommunityFetchUsercommunitiesStart => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_START)
);

export const communityFetchUsercommunitiesSuccess = withMatcher(
    (community: Community[]): CommunityFetchUsercommunitiesSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_SUCCESS, community)
);

export const communityFetchUsercommunitiesFailed = withMatcher(
    (error: Error): CommunityFetchUsercommunitiesFailed => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_USER_COMMUNITIES_FAILED, error)
);

export const communityFetchOtherUsercommunitiesStart = withMatcher(
    (userId: number): CommunityFetchOtherUsercommunitiesStart => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_START, { userId })
);

export const communityFetchOtherUsercommunitiesSuccess = withMatcher(
    (community: Community[]): CommunityFetchOtherUsercommunitiesSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_SUCCESS, community)
);

export const communityFetchOtherUsercommunitiesFailed = withMatcher(
    (error: Error): CommunityFetchOtherUsercommunitiesFailed => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_OTHER_USER_COMMUNITIES_FAILED, error)
);

export const communityFetchAllStart = withMatcher(
    (): CommunityFetchAllStart => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_ALL_START)
);

export const communityFetchAllSuccess = withMatcher(
    (community: Community[]): CommunityFetchAllSuccess => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_ALL_SUCCESS, community)
);

export const communityFetchAllFailed = withMatcher(
    (error: Error): CommunityFetchAllFailed => 
    createAction(COMMUNITY_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
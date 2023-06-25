import { MEMBER_ACTION_TYPES, Member } from './member.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type MemberCreateStart = ActionWithPayload<
    MEMBER_ACTION_TYPES.CREATE_START, { 
        communityId: number,
        userId: number
    }
>;

export type MemberCreateSuccess = ActionWithPayload<
    MEMBER_ACTION_TYPES.CREATE_SUCCESS, 
    Member[]
>;

export type MemberCreateFailed = ActionWithPayload<
    MEMBER_ACTION_TYPES.CREATE_FAILED,
    Error
>;
   
export type MemberDeleteStart = ActionWithPayload<
    MEMBER_ACTION_TYPES.DELETE_START,
    { memberId: number }
>;

export type MemberDeleteSuccess = ActionWithPayload<
    MEMBER_ACTION_TYPES.DELETE_SUCCESS, 
    Member[]
>;

export type MemberDeleteteFailed = ActionWithPayload<
    MEMBER_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MemberFetchSingleStart = ActionWithPayload<
    MEMBER_ACTION_TYPES.FETCH_SINGLE_START,
    { memberId: number }
>;

export type MemberFetchSingleSuccess = ActionWithPayload<
    MEMBER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Member
>;

export type MemberFetchSingleFailed = ActionWithPayload<
    MEMBER_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MemberFetchAllStart = Action<
    MEMBER_ACTION_TYPES.FETCH_ALL_START
>;

export type MemberFetchAllSuccess = ActionWithPayload<
    MEMBER_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Member[]
>;

export type MemberFetchAllFailed = ActionWithPayload<
    MEMBER_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const memberCreateStart = withMatcher(
    (   communityId: number,
        userId: number,
): MemberCreateStart => 
    createAction(MEMBER_ACTION_TYPES.CREATE_START, {
        communityId,
        userId
    })
);

export const memberCreateSuccess = withMatcher(
    (members: Member[]): MemberCreateSuccess => 
    createAction(MEMBER_ACTION_TYPES.CREATE_SUCCESS, members)
);

export const memberCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MEMBER_ACTION_TYPES.CREATE_START, error)
);

export const memberDeleteStart = withMatcher(
    (memberId: number): MemberDeleteStart => 
    createAction(MEMBER_ACTION_TYPES.DELETE_START, { memberId })
);

export const memberDeleteSuccess = withMatcher(
    (member: Member[]): MemberDeleteSuccess => 
    createAction(MEMBER_ACTION_TYPES.DELETE_SUCCESS, member)
);

export const memberDeleteFailed = withMatcher(
    (error: Error): MemberDeleteteFailed => 
    createAction(MEMBER_ACTION_TYPES.DELETE_FAILED, error)
);

export const memberFetchSingleStart = withMatcher(
    (memberId: number): MemberFetchSingleStart => 
    createAction(MEMBER_ACTION_TYPES.FETCH_SINGLE_START, { memberId })
);

export const memberFetchSingleSuccess = withMatcher(
    (member: Member): MemberFetchSingleSuccess => 
    createAction(MEMBER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, member)
);

export const memberFetchSingleFailed = withMatcher(
    (error: Error): MemberFetchSingleFailed => 
    createAction(MEMBER_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const memberFetchAllStart = withMatcher(
    (): MemberFetchAllStart => 
    createAction(MEMBER_ACTION_TYPES.FETCH_ALL_START)
);

export const memberFetchAllSuccess = withMatcher(
    (member: Member[]): MemberFetchAllSuccess => 
    createAction(MEMBER_ACTION_TYPES.FETCH_ALL_SUCCESS, member)
);

export const memberFetchAllFailed = withMatcher(
    (error: Error): MemberFetchAllFailed => 
    createAction(MEMBER_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
import { AnyAction } from 'redux';

import { Member } from './member.types';

import {
    memberCreateFailed,
    memberCreateSuccess,
    memberDeleteFailed,
    memberDeleteSuccess,
    memberFetchAllFailed,
    memberFetchAllStart,
    memberFetchAllSuccess,
    memberFetchSingleFailed,
    memberFetchSingleStart,
    memberFetchSingleSuccess,
} from './member.action';

export type MemberState = {
    readonly memberId: number | null;
    readonly singleMember: Member | null;
    readonly userMembers: Member[] | null;
    readonly members: Member[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: MemberState = {
    memberId: null,
    singleMember: null,
    userMembers: [],
    members: [],
    isLoading: false,
    error: null
};

export const memberReducer = (
    state = INITIAL_STATE, action: AnyAction
): MemberState => {
    if (
        memberFetchAllStart.match(action) ||
        memberFetchSingleStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        memberFetchSingleSuccess.match(action)
    ) {
        return { ...state, isLoading: false, singleMember: action.payload };
    }
    if (
        memberCreateSuccess.match(action) ||
        memberFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, members: action.payload };
    } 
    if (
        memberDeleteSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userMembers: action.payload };
    } 
    if (
        memberCreateFailed.match(action) ||
        memberDeleteFailed.match(action) ||
        memberFetchSingleFailed.match(action) ||
        memberFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
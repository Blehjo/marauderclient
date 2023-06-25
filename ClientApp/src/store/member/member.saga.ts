import { all, call, put, takeLatest } from 'typed-redux-saga';

import { MEMBER_ACTION_TYPES } from './member.types';

import {
    MemberCreateStart,
    memberCreateFailed,
    memberCreateSuccess,
    memberDeleteFailed,
    memberDeleteSuccess,
    memberFetchAllFailed,
    memberFetchAllSuccess,
    memberFetchSingleFailed,
    memberFetchSingleSuccess,
    MemberDeleteStart,
    MemberFetchSingleStart
} from './member.action';

import {
    addMember,
    deleteMember,
    getAllMembers,
    getSingleMember
} from '../../utils/api/member.api';

export function* createMember({ payload: { 
    communityId
}}: MemberCreateStart ) {
    try {
        const members = yield* call(
            addMember,
            communityId

        ); 
        yield* put(memberCreateSuccess(members));
    } catch (error) {
        yield* put(memberCreateFailed(error as Error));
    }
}

export function* removemember({ payload: { memberId }}: MemberDeleteStart) {
    try {
        const members = yield* call(
            deleteMember,
            memberId
        ); 
        yield* put(memberDeleteSuccess(members));
    } catch (error) {
        yield* put(memberDeleteFailed(error as Error));
    }
}

export function* fetchSingleMember({ 
    payload: { memberId } }: MemberFetchSingleStart) {
    try {
        const memberSnapshot = yield* call(
            getSingleMember,
            memberId 
        );
        yield* put(memberFetchSingleSuccess(memberSnapshot));
    } catch (error) {
        yield* put(memberFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMembers() {
    try {
        const members = yield* call(getAllMembers);
        yield* put(memberFetchAllSuccess(members));
    } catch (error) {
        yield* put(memberFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.CREATE_START, 
        createMember
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.DELETE_START, 
        removemember
    );
}

export function* onFetchSinglememberStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMember
    );
}
  
export function* onFetchmembersStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMembers
    );
}

export function* memberSagas() {
    yield* all([
        call(onCreateStart),
        call(onDeleteStart),
        call(onFetchSinglememberStart),
        call(onFetchmembersStart)
    ]);
}
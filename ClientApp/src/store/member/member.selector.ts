import { createSelector } from 'reselect';

import { RootState } from '../store';

import { MemberState } from './member.reducer';

export const selectMemberReducer = (state: RootState): MemberState => state.member;

export const selectIsMmemberLoading = createSelector(
  [selectMemberReducer],
  (member) => member.isLoading
);

export const selectMemberId = createSelector(
  [selectMemberReducer],
  (member) => member.memberId
);

export const selectSingleMember = createSelector(
  [selectMemberReducer],
  (member) => member.singleMember
);

export const selectUserMembers = createSelector(
  [selectMemberReducer],
  (member) => member.userMembers
);

export const selectAllMembers = createSelector(
  [selectMemberReducer],
  (member) => member.members
);
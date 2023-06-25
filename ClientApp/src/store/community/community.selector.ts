import { createSelector } from 'reselect';

import { RootState } from '../store';

import { CommunityState } from './community.reducer';

export const selectCommunityReducer = (state: RootState): CommunityState => state.community;

export const selectCommunityId = createSelector(
  [selectCommunityReducer],
  (community) => community.communityId
);

export const selectSingleCommunity = createSelector(
  [selectCommunityReducer],
  (community) => community.singleCommunity
);

export const selectUserCommunities = createSelector(
  [selectCommunityReducer],
  (community) => community.userCommunities
);

export const selectAllCommunities = createSelector(
  [selectCommunityReducer],
  (community) => community.communities
);

export const selectIsCommunityLoading = createSelector(
  [selectCommunityReducer],
  (community) => community.isLoading
);
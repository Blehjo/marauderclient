import { createSelector } from 'reselect';

import { RootState } from '../store';

import { FollowerState } from './follower.reducer';

export const selectFollowerReducer = (state: RootState): FollowerState => state.follower;

export const selectFollowerId = createSelector(
  [selectFollowerReducer],
  (follower) => follower.followerId
);

export const selectSingleFollower = createSelector(
  [selectFollowerReducer],
  (follower) => follower.singleFollower
);

export const selectUserFollowers = createSelector(
  [selectFollowerReducer],
  (follower) => follower.userFollowers
);

export const selectAllFollowers = createSelector(
  [selectFollowerReducer],
  (follower) => follower.followers
);
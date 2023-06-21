import { createSelector } from 'reselect';

import { RootState } from '../store';

import { FavoriteState } from './favorite.reducer';

export const selectFavoriteReducer = (state: RootState): FavoriteState => state.favorite;

export const selectFavoriteId = createSelector(
  [selectFavoriteReducer],
  (favorite) => favorite.favoriteId
);

export const selectSingleFavorite = createSelector(
  [selectFavoriteReducer],
  (favorite) => favorite.singleFavorite
);

export const selectUserFavorites = createSelector(
  [selectFavoriteReducer],
  (favorite) => favorite.userFavorites
);

export const selectAllFavorites = createSelector(
  [selectFavoriteReducer],
  (favorite) => favorite.favorites
);
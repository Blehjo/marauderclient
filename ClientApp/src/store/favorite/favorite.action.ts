import { FAVORITE_ACTION_TYPES, Favorite } from './favorite.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type FavoriteCreateStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_START, { contentId: number, contentType: string }
>;

export type FavoriteCreateSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_SUCCESS, 
    Favorite[]
>;

export type FavoriteCreateFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type FavoriteUpdateStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_START,
    Favorite
>;

export type FavoriteUpdateSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_SUCCESS, 
    Favorite[]
>;

export type FavoriteUpdateFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type FavoriteDeleteStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_START, { favoriteId: number }
>;

export type FavoriteDeleteSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_SUCCESS, 
    Favorite[]
>;

export type FavoriteDeleteteFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type FavoriteFetchSingleStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type FavoriteFetchSingleSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Favorite
>;

export type FavoriteFetchSingleFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type FavoriteFetchSingleUserFavoritesStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_START, { userId: number }
>;

export type FavoriteFetchSingleUserFavoritesSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_SUCCESS, 
    Favorite[]
>;

export type FavoriteFetchSingleUserFavoritesFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_FAILED,
    Error
>;

export type FavoriteFetchUserFavoritesStart = Action<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_START
>;

export type FavoriteFetchUserFavoritesSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_SUCCESS, 
    Favorite[]
>;

export type FavoriteFetchUserFavoritesFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_FAILED,
    Error
>;

export type FavoriteFetchAllStart = Action<
    FAVORITE_ACTION_TYPES.FETCH_ALL_START
>;

export type FavoriteFetchAllSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Favorite[]
>;

export type FavoriteFetchAllFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const favoriteCreateStart = withMatcher(
    (contentId: number, contentType: string): FavoriteCreateStart => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_START, { contentId, contentType })
);

export const favoriteCreateSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteCreateSuccess => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_SUCCESS, favorite)
);

export const favoriteCreateFailed = withMatcher(
    (error: Error) => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_START, error)
);
 
export const favoriteUpdateStart = withMatcher(
    (favorite: Favorite): FavoriteUpdateStart => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_START, favorite)
);

export const favoriteUpdateSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteUpdateSuccess => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_SUCCESS, favorite)
);

export const favoriteUpdateFailed = withMatcher(
    (error: Error): FavoriteUpdateFailed => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const favoriteDeleteStart = withMatcher(
    (favoriteId: number): FavoriteDeleteStart => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_START, { favoriteId })
);

export const favoriteDeleteSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteDeleteSuccess => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_SUCCESS, favorite)
);

export const favoriteDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_START, error)
);

export const favoriteFetchSingleStart = withMatcher(
    (favoriteId: number): FavoriteFetchSingleStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_START, favoriteId)
);

export const favoriteFetchSingleSuccess = withMatcher(
    (favorite: Favorite): FavoriteFetchSingleSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, favorite)
);

export const favoriteFetchSingleFailed = withMatcher(
    (error: Error): FavoriteFetchSingleFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const favoriteFetchSingleUserFavoritesStart = withMatcher(
    (userId: number): FavoriteFetchSingleUserFavoritesStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_START, { userId }
));

export const favoriteFetchSingleUserFavoritesSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteFetchSingleUserFavoritesSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_SUCCESS, favorite)
);

export const favoriteFetchSingleUserFavoritesFailed = withMatcher(
    (error: Error): FavoriteFetchSingleUserFavoritesFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_FAILED, error)
);

export const favoriteFetchUserFavoritesStart = withMatcher(
    (): FavoriteFetchUserFavoritesStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_START
));

export const favoriteFetchUserFavoritesSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteFetchUserFavoritesSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_SUCCESS, favorite)
);

export const favoriteFetchUserFavoritesFailed = withMatcher(
    (error: Error): FavoriteFetchUserFavoritesFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_FAILED, error)
);

export const favoriteFetchAllStart = withMatcher(
    (): FavoriteFetchAllStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_START)
);

export const favoriteFetchAllSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteFetchAllSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_SUCCESS, favorite)
);

export const favoriteFetchAllFailed = withMatcher(
    (error: Error): FavoriteFetchAllFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
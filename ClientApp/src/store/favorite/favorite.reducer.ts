import { AnyAction } from 'redux';

import { Favorite } from './favorite.types';

import {
    favoriteCreateFailed,
    favoriteCreateSuccess,
    favoriteDeleteFailed,
    favoriteDeleteSuccess,
    favoriteFetchAllFailed,
    favoriteFetchAllStart,
    favoriteFetchAllSuccess,
    favoriteFetchSingleFailed,
    favoriteFetchSingleStart,
    favoriteFetchSingleSuccess,
    favoriteFetchSingleUserFavoritesSuccess,
    favoriteFetchUserFavoritesStart,
    favoriteFetchUserFavoritesSuccess,
    favoriteUpdateFailed,
    favoriteUpdateSuccess
} from './favorite.action';

export type FavoriteState = {
    readonly favoriteId: number | null;
    readonly singleFavorite: Favorite | null;
    readonly userFavorites: Favorite[] | null;
    readonly favorites: Favorite[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: FavoriteState = {
    favoriteId: null,
    singleFavorite: null,
    userFavorites: [],
    favorites: [],
    isLoading: false,
    error: null
};

export const favoriteReducer = (
    state = INITIAL_STATE, action: AnyAction
): FavoriteState => {
    if (
        favoriteFetchAllStart.match(action) ||
        favoriteFetchSingleStart.match(action) ||
        favoriteFetchUserFavoritesStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        favoriteFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleFavorite: action.payload };
    }  
    if (
        favoriteCreateSuccess.match(action) ||
        favoriteUpdateSuccess.match(action) ||
        favoriteDeleteSuccess.match(action) ||
        favoriteFetchUserFavoritesSuccess.match(action) ||
        favoriteFetchSingleUserFavoritesSuccess.match(action) ||
        favoriteFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, favorites: action.payload };
    } 
    if (
        favoriteCreateFailed.match(action) ||
        favoriteUpdateFailed.match(action) ||
        favoriteDeleteFailed.match(action) ||
        favoriteFetchSingleFailed.match(action) ||
        favoriteFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
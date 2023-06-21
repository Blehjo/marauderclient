import { takeLatest, put, all, call } from 'typed-redux-saga';

import { FAVORITE_ACTION_TYPES } from './favorite.types';

import {
    favoriteCreateStart,
    favoriteCreateSuccess,
    favoriteCreateFailed,
    favoriteUpdateStart,
    favoriteUpdateSuccess,
    favoriteUpdateFailed,
    favoriteDeleteStart,
    favoriteDeleteSuccess,
    favoriteDeleteFailed,
    favoriteFetchSingleStart,
    favoriteFetchSingleSuccess,
    favoriteFetchSingleFailed,
    favoriteFetchAllStart,
    favoriteFetchAllSuccess,
    favoriteFetchAllFailed,
    FavoriteCreateStart,
    FavoriteDeleteStart,
    FavoriteFetchAllStart,
    FavoriteFetchSingleUserFavoritesStart,
    favoriteFetchSingleUserFavoritesSuccess,
    favoriteFetchSingleUserFavoritesFailed,
    favoriteFetchUserFavoritesSuccess,
    favoriteFetchUserFavoritesFailed,
} from './favorite.action';

import { 
    getSingleFavorite,
    getUserFavorites,
    getFavorites, 
    addFavorite, 
    deleteFavorite,
    getSingleUserFavorites
} from '../../utils/api/favorite.api';
import { FavoriteFetchUserFavoritesStart } from './favorite.action';

export function* fetchUserFavoritesAsync({}: FavoriteFetchUserFavoritesStart) {
    try {
        const favorites = yield* call(
            getUserFavorites
        );
      yield* put(favoriteFetchUserFavoritesSuccess(favorites));
    } catch (error) {
      yield* put(favoriteFetchUserFavoritesFailed(error as Error));
    }
}

export function* fetchSingleUserFavoritesAsync({ payload: { userId }}: FavoriteFetchSingleUserFavoritesStart) {
    try {
        const favorites = yield* call(
            getSingleUserFavorites,
            userId
        );
      yield* put(favoriteFetchSingleUserFavoritesSuccess(favorites));
    } catch (error) {
      yield* put(favoriteFetchSingleUserFavoritesFailed(error as Error));
    }
}

export function* fetchFavoritesAsync({ }: FavoriteFetchAllStart) {
    try {
        const favorites = yield* call(
            getFavorites
        );
      yield* put(favoriteFetchAllSuccess(favorites));
    } catch (error) {
      yield* put(favoriteFetchAllFailed(error as Error));
    }
}

export function* createFavorite({ payload: { contentId, contentType }}: FavoriteCreateStart ) {
    try {
        const favorite = yield* call(
            addFavorite,
            contentId,
            contentType
        )
        if (!favorite) return;
        yield* put(favoriteCreateSuccess(favorite));
    } catch (error) {
        yield* put(favoriteCreateFailed(error as Error));
    }
}

export function* removeFavorite({ payload: { favoriteId }}: FavoriteDeleteStart) {
    try {
        const favorite = yield* call(
            deleteFavorite,
            favoriteId
        )
        if (!favorite) return;
        yield* put(favoriteDeleteSuccess(favorite));
    } catch (error) {
        yield* put(favoriteDeleteFailed(error as Error))
    }
}

export function* onStart() {
    yield takeLatest(FAVORITE_ACTION_TYPES.CREATE_START, createFavorite);
}

export function* onDelete() {
    yield takeLatest(FAVORITE_ACTION_TYPES.DELETE_START, removeFavorite);
}

export function* onFetchUser() {
    yield takeLatest(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_START, fetchUserFavoritesAsync);
}

export function* onFetchSingleUser() {
    yield takeLatest(FAVORITE_ACTION_TYPES.FETCH_SINGLE_USER_FAVORITES_START, fetchSingleUserFavoritesAsync);
}

export function* onFetch() {
    yield takeLatest(FAVORITE_ACTION_TYPES.FETCH_ALL_START, fetchFavoritesAsync);
}

export function* favoriteSagas() {
    yield all([
        call(onStart),
        call(onDelete),
        call(onFetchUser),
        call(onFetchSingleUser),
        call(onFetch)
    ]);
}
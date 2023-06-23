import { AnyAction } from 'redux';

import { Moon } from './moon.types';

import {
    moonCreateStart,
    moonCreateSuccess,
    moonCreateFailed,
    moonUpdateStart,
    moonUpdateSuccess,
    moonUpdateFailed,
    moonDeleteStart,
    moonDeleteSuccess,
    moonDeleteFailed,
    moonFetchSingleStart,
    moonFetchSingleSuccess,
    moonFetchSingleFailed,
    moonFetchAllStart,
    moonFetchAllSuccess,
    moonFetchAllFailed,
    moonFetchUserMoonsSuccess,
    moonFetchOtherUserMoonsSuccess,
    moonFetchUserMoonsStart,
    moonFetchOtherUserMoonsStart,
    moonFetchUserMoonsFailed,
    moonFetchOtherUserMoonsFailed,
} from './moon.action';

export type MoonState = {
    readonly moonId: number | null;
    readonly singleMoon: Moon | null;
    readonly userMoons: Moon[] | null;
    readonly moons: Moon[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: MoonState = {
    moonId: null,
    singleMoon: null,
    userMoons: [],
    moons: [],
    isLoading: false,
    error: null
};

export const memberReducer = (
    state = INITIAL_STATE, action: AnyAction
): MoonState => {
    if (
        moonFetchAllStart.match(action) ||
        moonFetchSingleStart.match(action) ||
        moonFetchUserMoonsStart.match(action) ||
        moonFetchOtherUserMoonsStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        moonCreateSuccess.match(action) ||
        moonUpdateSuccess.match(action) ||
        moonFetchSingleSuccess.match(action)
    ) {
        return { ...state, isLoading: false, singleMoon: action.payload };
    }
    if (
        moonFetchAllSuccess.match(action) ||
        moonFetchOtherUserMoonsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, moons: action.payload };
    } 
    if (
        moonDeleteSuccess.match(action) ||
        moonFetchUserMoonsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userMoons: action.payload };
    } 
    if (
        moonCreateFailed.match(action) ||
        moonUpdateFailed.match(action) ||
        moonDeleteFailed.match(action) ||
        moonFetchSingleFailed.match(action) ||
        moonFetchAllFailed.match(action) ||
        moonFetchUserMoonsFailed.match(action) ||
        moonFetchOtherUserMoonsFailed.match(action)
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
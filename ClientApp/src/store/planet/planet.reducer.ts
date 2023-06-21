import { AnyAction } from 'redux';

import { Planet } from './planet.types';

import {
    planetCreateStart,
    planetCreateSuccess,
    planetCreateFailed,
    planetUpdateStart,
    planetUpdateSuccess,
    planetUpdateFailed,
    planetDeleteStart,
    planetDeleteSuccess,
    planetDeleteFailed,
    planetFetchSingleStart,
    planetFetchSingleSuccess,
    planetFetchSingleFailed,
    planetFetchAllStart,
    planetFetchAllSuccess,
    planetFetchAllFailed,
    planetFetchUserPlanetsSuccess,
    planetFetchOtherUserPlanetsSuccess,
    planetFetchUserPlanetsStart,
    planetFetchOtherUserPlanetsStart,
} from './planet.action';

export type PlanetState = {
    readonly planetId: number | null;
    readonly singlePlanet: Planet | null;
    readonly userPlanets: Planet[] | null;
    readonly planets: Planet[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: PlanetState = {
    planetId: null,
    singlePlanet: null,
    userPlanets: [],
    planets: [],
    isLoading: false,
    error: null
};

export const planetReducer = (
    state = INITIAL_STATE, action: AnyAction
): PlanetState => {
    if (
        planetFetchAllStart.match(action) ||
        planetFetchSingleStart.match(action) ||
        planetFetchUserPlanetsStart.match(action) ||
        planetFetchOtherUserPlanetsStart.match(action) ||
        planetCreateStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        planetFetchUserPlanetsSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userPlanets: action.payload }
    }
    if (
        planetUpdateSuccess.match(action) ||
        planetFetchSingleSuccess.match(action)
    ) {
        return { ...state, isLoading: false, singlePlanet: action.payload }
    }
    if (
        planetFetchAllSuccess.match(action) || 
        planetFetchOtherUserPlanetsSuccess.match(action)
    ) {
        return { ...state, isLoading: false, planets: action.payload };
    } 
    if (
        planetCreateSuccess.match(action) ||
        planetDeleteSuccess.match(action)
    ) {
        return { ...state, isLoading: false, userPlanets: action.payload };
    } 
    if (
        planetCreateFailed.match(action) ||
        planetUpdateFailed.match(action) ||
        planetDeleteFailed.match(action) ||
        planetFetchSingleFailed.match(action) ||
        planetFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
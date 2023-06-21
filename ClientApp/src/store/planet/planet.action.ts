import { PLANET_ACTION_TYPES, Planet } from './planet.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type PlanetCreateStart = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_START, { 
        planetName: string, 
        planetMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        imageLink: string,
        imageFile: File  
    }
>;

export type PlanetCreateSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_SUCCESS, 
    Planet[]
>;

export type PlanetCreateFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PlanetUpdateStart = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_START, { 
        planetId: number,
        planetName: string, 
        planetMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        imageLink: string,
        imageFile: File
    }
>;

export type PlanetUpdateSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_SUCCESS, 
    Planet
>;

export type PlanetUpdateFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PlanetDeleteStart = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_START,
    { planetId: number }
>;

export type PlanetDeleteSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_SUCCESS, 
    Planet[]
>;

export type PlanetDeleteteFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PlanetFetchSingleStart = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_START,
    { planetId: number }
>;

export type PlanetFetchSingleSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Planet
>;

export type PlanetFetchSingleFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PlanetFetchUserPlanetsStart = Action<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START
>;

export type PlanetFetchUserPlanetsSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_SUCCESS, 
    Planet[]
>;

export type PlanetFetchUserPlanetsFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_FAILED,
    Error
>;

export type PlanetFetchOtherUserPlanetsStart = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_START,
    { userId: number }
>;

export type PlanetFetchOtherUserPlanetsSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_SUCCESS, 
    Planet[]
>;

export type PlanetFetchOtherUserPlanetsFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_FAILED,
    Error
>;

export type PlanetFetchAllStart = Action<
    PLANET_ACTION_TYPES.FETCH_ALL_START
>;

export type PlanetFetchAllSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Planet[]
>;

export type PlanetFetchAllFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const planetCreateStart = withMatcher(
    (   planetName: string, 
        planetMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        imageLink: string,
        imageFile: File 
): PlanetCreateStart => 
    createAction(PLANET_ACTION_TYPES.CREATE_START, {
        planetName, 
        planetMass, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        imageLink,
        imageFile 
    })
);

export const planetCreateSuccess = withMatcher(
    (planets: Planet[]): PlanetCreateSuccess => 
    createAction(PLANET_ACTION_TYPES.CREATE_SUCCESS, planets)
);

export const planetCreateFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_ACTION_TYPES.CREATE_START, error)
);
 
export const planetUpdateStart = withMatcher(
    (   planetId: number,
        planetName: string, 
        planetMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        imageLink: string, 
        imageFile: File
): PlanetUpdateStart => 
    createAction(PLANET_ACTION_TYPES.UPDATE_START, {
        planetId,
        planetName, 
        planetMass, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        imageLink, 
        imageFile
    })
);

export const planetUpdateSuccess = withMatcher(
    (planet: Planet): PlanetUpdateSuccess => 
    createAction(PLANET_ACTION_TYPES.UPDATE_SUCCESS, planet)
);

export const planetUpdateFailed = withMatcher(
    (error: Error): PlanetUpdateFailed => 
    createAction(PLANET_ACTION_TYPES.UPDATE_FAILED, error)
);

export const planetDeleteStart = withMatcher(
    (planetId: number): PlanetDeleteStart => 
    createAction(PLANET_ACTION_TYPES.DELETE_START, { planetId })
);

export const planetDeleteSuccess = withMatcher(
    (planet: Planet[]): PlanetDeleteSuccess => 
    createAction(PLANET_ACTION_TYPES.DELETE_SUCCESS, planet)
);

export const planetDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_ACTION_TYPES.DELETE_START, error)
);

export const planetFetchSingleStart = withMatcher(
    (planetId: number): PlanetFetchSingleStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_START, { planetId })
);

export const planetFetchSingleSuccess = withMatcher(
    (planet: Planet): PlanetFetchSingleSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_SUCCESS, planet)
);

export const planetFetchSingleFailed = withMatcher(
    (error: Error): PlanetFetchSingleFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const planetFetchUserPlanetsStart = withMatcher(
    (): PlanetFetchUserPlanetsStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START)
);

export const planetFetchUserPlanetsSuccess = withMatcher(
    (planet: Planet[]): PlanetFetchUserPlanetsSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_SUCCESS, planet)
);

export const planetFetchUserPlanetsFailed = withMatcher(
    (error: Error): PlanetFetchUserPlanetsFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_FAILED, error)
);

export const planetFetchOtherUserPlanetsStart = withMatcher(
    (userId: number): PlanetFetchOtherUserPlanetsStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_START, { userId })
);

export const planetFetchOtherUserPlanetsSuccess = withMatcher(
    (planet: Planet[]): PlanetFetchOtherUserPlanetsSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_SUCCESS, planet)
);

export const planetFetchOtherUserPlanetsFailed = withMatcher(
    (error: Error): PlanetFetchOtherUserPlanetsFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_FAILED, error)
);

export const planetFetchAllStart = withMatcher(
    (): PlanetFetchAllStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_START)
);

export const planetFetchAllSuccess = withMatcher(
    (planet: Planet[]): PlanetFetchAllSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_SUCCESS, planet)
);

export const planetFetchAllFailed = withMatcher(
    (error: Error): PlanetFetchAllFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
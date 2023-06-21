import { MOON_ACTION_TYPES, Moon } from './moon.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MoonCreateStart = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_START, { 
        moonName: string, 
        moonMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        planetId: number | null,
        imageLink: string, 
        imageFile: File,
    }
>;

export type MoonCreateSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_SUCCESS, 
    Moon
>;

export type MoonCreateFailed = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MoonUpdateStart = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_START, { 
        moonId: number,
        moonName: string, 
        moonMass: number, 
        perihelion: number, 
        aphelion: number, 
        gravity: number, 
        temperature: number, 
        planetId: number 
        imageLink: string | null, 
        imageFile: File | null, 
    }
>;

export type MoonUpdateSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_SUCCESS, 
    Moon
>;

export type MoonUpdateFailed = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MoonDeleteStart = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_START,
    { moonId: number }
>;

export type MoonDeleteSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_SUCCESS, 
    Moon[]
>;

export type MoonDeleteteFailed = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MoonFetchSingleStart = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_START,
    { moonId: number }
>;

export type MoonFetchSingleSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Moon
>;

export type MoonFetchSingleFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MoonFetchUserMoonsStart = Action<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_START
>;

export type MoonFetchUserMoonsSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_SUCCESS, 
    Moon[]
>;

export type MoonFetchUserMoonsFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_FAILED,
    Error
>;

export type MoonFetchOtherUserMoonsStart = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_START,
    { userId: number }
>;

export type MoonFetchOtherUserMoonsSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_SUCCESS, 
    Moon[]
>;

export type MoonFetchOtherUserMoonsFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_FAILED,
    Error
>;

export type MoonFetchAllStart = Action<
    MOON_ACTION_TYPES.FETCH_ALL_START
>;

export type MoonFetchAllSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Moon[]
>;

export type MoonFetchAllFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const moonCreateStart = withMatcher(
    (   moonName: string, 
        moonMass: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        planetId: number | null,
        imageLink: string, 
        imageFile: File,
): MoonCreateStart => 
    createAction(MOON_ACTION_TYPES.CREATE_START, {
        moonName, 
        moonMass, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        planetId,
        imageLink, 
        imageFile,
    })
);

export const moonCreateSuccess = withMatcher(
    (moon: Moon): MoonCreateSuccess => 
    createAction(MOON_ACTION_TYPES.CREATE_SUCCESS, moon)
);

export const moonCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_ACTION_TYPES.CREATE_START, error)
);
 
export const moonUpdateStart = withMatcher(
    (   moonId: number,
        moonName: string, 
        moonMass: number, 
        perihelion: number, 
        aphelion: number, 
        gravity: number, 
        planetId: number,
        temperature: number, 
        imageLink: string | null, 
        imageFile: File | null
    ): MoonUpdateStart => 
    createAction(MOON_ACTION_TYPES.UPDATE_START, {
        moonId,
        moonName, 
        moonMass, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        planetId,
        imageLink,
        imageFile 
    })
);

export const moonUpdateSuccess = withMatcher(
    (moon: Moon): MoonUpdateSuccess => 
    createAction(MOON_ACTION_TYPES.UPDATE_SUCCESS, moon)
);

export const moonUpdateFailed = withMatcher(
    (error: Error): MoonUpdateFailed => 
    createAction(MOON_ACTION_TYPES.UPDATE_FAILED, error)
);

export const moonDeleteStart = withMatcher(
    (moonId: number): MoonDeleteStart => 
    createAction(MOON_ACTION_TYPES.DELETE_START, { moonId })
);

export const moonDeleteSuccess = withMatcher(
    (moon: Moon[]): MoonDeleteSuccess => 
    createAction(MOON_ACTION_TYPES.DELETE_SUCCESS, moon)
);

export const moonDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_ACTION_TYPES.DELETE_START, error)
);

export const moonFetchSingleStart = withMatcher(
    (moonId: number): MoonFetchSingleStart => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_START, { moonId })
);

export const moonFetchSingleSuccess = withMatcher(
    (moon: Moon): MoonFetchSingleSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_SUCCESS, moon)
);

export const moonFetchSingleFailed = withMatcher(
    (error: Error): MoonFetchSingleFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const moonFetchUserMoonsStart = withMatcher(
    (): MoonFetchUserMoonsStart => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_START)
);

export const moonFetchUserMoonsSuccess = withMatcher(
    (moons: Moon[]): MoonFetchUserMoonsSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_SUCCESS, moons)
);

export const moonFetchUserMoonsFailed = withMatcher(
    (error: Error): MoonFetchUserMoonsFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_FAILED, error)
);

export const moonFetchOtherUserMoonsStart = withMatcher(
    (userId: number): MoonFetchOtherUserMoonsStart => 
    createAction(MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_START, { userId })
);

export const moonFetchOtherUserMoonsSuccess = withMatcher(
    (moon: Moon[]): MoonFetchOtherUserMoonsSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_SUCCESS, moon)
);

export const moonFetchOtherUserMoonsFailed = withMatcher(
    (error: Error): MoonFetchOtherUserMoonsFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_OTHER_USER_MOONS_FAILED, error)
);

export const moonFetchAllStart = withMatcher(
    (): MoonFetchAllStart => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_START)
);

export const moonFetchAllSuccess = withMatcher(
    (moon: Moon[]): MoonFetchAllSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_SUCCESS, moon)
);

export const moonFetchAllFailed = withMatcher(
    (error: Error): MoonFetchAllFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
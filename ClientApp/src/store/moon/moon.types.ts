import { Favorite } from "../favorite/favorite.types";

export enum MOON_ACTION_TYPES  {
    CREATE_START = 'moon/CREATE_START',
    CREATE_SUCCESS = 'moon/CREATE_SUCCESS',
    CREATE_FAILED = 'moon/CREATE_FAILED',
    UPDATE_START = 'moon/UPDATE_START',
    UPDATE_SUCCESS = 'moon/UPDATE_SUCCESS',
    UPDATE_FAILED = 'moon/UPDATE_FAILED',
    DELETE_START = 'moon/DELETE_START',
    DELETE_SUCCESS = 'moon/DELETE_SUCCESS',
    DELETE_FAILED = 'moon/DELETE_FAILED',
    FETCH_SINGLE_START = 'moon/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'moon/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'moon/FETCH_SINGLE_FAILED',
    FETCH_USER_MOONS_START = 'moon/FETCH_USER_MOONS_START',
    FETCH_USER_MOONS_SUCCESS = 'moon/FETCH_USER_MOONS_SUCCESS',
    FETCH_USER_MOONS_FAILED = 'moon/FETCH_USER_MOONS_FAILED',
    FETCH_OTHER_USER_MOONS_START = 'moon/FETCH_OTHER_USER_MOONS_START',
    FETCH_OTHER_USER_MOONS_SUCCESS = 'moon/FETCH_OTHER_USER_MOONS_SUCCESS',
    FETCH_OTHER_USER_MOONS_FAILED = 'moon/FETCH_OTHER_USER_MOONS_FAILED',
    FETCH_ALL_START = 'moon/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'moon/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'moon/FETCH_ALL_FAILED',
};

export type Moon = {
    moonId: number;
    moonName: string;
    moonMass: number;
    perihelion: number;
    aphelion: number;
    gravity: number;
    temperature: number;
    modelLink: string;
    description: string;
    brief: string;
    type: string;
    imageLink: string;
    imageSource: string;
    planetId: number;
    favorites: Favorite[];
}
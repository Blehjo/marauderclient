import { Favorite } from "../favorite/favorite.types";
import { Moon } from "../moon/moon.types";

export enum PLANET_ACTION_TYPES  {
    CREATE_START = 'planet/CREATE_START',
    CREATE_SUCCESS = 'planet/CREATE_SUCCESS',
    CREATE_FAILED = 'planet/CREATE_FAILED',
    UPDATE_START = 'planet/UPDATE_START',
    UPDATE_SUCCESS = 'planet/UPDATE_SUCCESS',
    UPDATE_FAILED = 'planet/UPDATE_FAILED',
    DELETE_START = 'planet/DELETE_START',
    DELETE_SUCCESS = 'planet/DELETE_SUCCESS',
    DELETE_FAILED = 'planet/DELETE_FAILED',
    FETCH_SINGLE_START = 'planet/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'planet/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'planet/FETCH_SINGLE_FAILED',
    FETCH_USER_PLANETS_START = 'planet/FETCH_USER_PLANETS_START',
    FETCH_USER_PLANETS_SUCCESS = 'planet/FETCH_USER_PLANETS_SUCCESS',
    FETCH_USER_PLANETS_FAILED = 'planet/FETCH_USER_PLANETS_FAILED',
    FETCH_OTHER_USER_PLANETS_START = 'planet/FETCH_OTHER_USER_PLANETS_START',
    FETCH_OTHER_USER_PLANETS_SUCCESS = 'planet/FETCH_OTHER_USER_PLANETS_SUCCESS',
    FETCH_OTHER_USER_PLANETS_FAILED = 'planet/FETCH_OTHER_USER_PLANETS_FAILED',
    FETCH_ALL_START = 'planet/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'planet/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'planet/FETCH_ALL_FAILED',
};

export type Planet = {
    planetId: number;
    planetName: string;
    planetMass: string;
    perihelion: string;
    aphelion: string;
    gravity: string;
    temperature: string;
    brief: string;
    description: string;
    modelLink: string;
    type: string;
    imageSource: string;
    imageLink: string | null;
    moons: Moon[];
    favorites: Favorite[];
}
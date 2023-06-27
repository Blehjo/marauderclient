import { Note } from "../note/note.types";

export enum MOVEABLE_ACTION_TYPES {
    CREATE_START = 'moveable/CREATE_START',
    CREATE_SUCCESS = 'moveable/CREATE_SUCCESS',
    CREATE_FAILED = 'moveable/CREATE_FAILED',
    UPDATE_START = 'moveable/UPDATE_START',
    UPDATE_SUCCESS = 'moveable/UPDATE_SUCCESS',
    UPDATE_FAILED = 'moveable/UPDATE_FAILED',
    DELETE_START = 'moveable/DELETE_START',
    DELETE_SUCCESS = 'moveable/DELETE_SUCCESS',
    DELETE_FAILED = 'moveable/DELETE_FAILED',
    FETCH_SINGLE_START = 'moveable/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'moveable/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'moveable/FETCH_SINGLE_FAILED',
    FETCH_ALL_USER_START = 'moveable/FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS = 'moveable/FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED = 'moveable/FETCH_ALL_USER_FAILED',
    FETCH_ALL_START = 'moveable/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'moveable/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'moveable/FETCH_ALL_FAILED'
};

export type Moveable = {
    panelId: number | null;
    title: string | null;
    xCoord: number | null;
    yCoord: number | null;
    dateCreated: Date;
    notes: Note[];
}
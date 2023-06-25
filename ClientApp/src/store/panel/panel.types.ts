import { Note } from "../note/note.types";

export enum PANEL_ACTION_TYPES {
    CREATE_START = 'panel/CREATE_START',
    CREATE_SUCCESS = 'panel/CREATE_SUCCESS',
    CREATE_FAILED = 'panel/CREATE_FAILED',
    UPDATE_START = 'panel/UPDATE_START',
    UPDATE_SUCCESS = 'panel/UPDATE_SUCCESS',
    UPDATE_FAILED = 'panel/UPDATE_FAILED',
    DELETE_START = 'panel/DELETE_START',
    DELETE_SUCCESS = 'panel/DELETE_SUCCESS',
    DELETE_FAILED = 'panel/DELETE_FAILED',
    FETCH_SINGLE_START = 'panel/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'panel/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'panel/FETCH_SINGLE_FAILED',
    FETCH_ALL_USER_START = 'panel/FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS = 'panel/FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED = 'panel/FETCH_ALL_USER_FAILED',
    FETCH_ALL_START = 'panel/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'panel/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'panel/FETCH_ALL_FAILED'
};

export type Panel = {
    panelId: number | null;
    title: string | null;
    dateCreated: Date;
    notes: Note[];
}
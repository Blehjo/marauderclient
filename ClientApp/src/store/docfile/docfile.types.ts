import { Note } from "../note/note.types";

export enum DOCFILE_ACTION_TYPES {
    CREATE_START = 'docfile/CREATE_START',
    CREATE_SUCCESS = 'docfile/CREATE_SUCCESS',
    CREATE_FAILED = 'docfile/CREATE_FAILED',
    UPDATE_START = 'docfile/UPDATE_START',
    UPDATE_SUCCESS = 'docfile/UPDATE_SUCCESS',
    UPDATE_FAILED = 'docfile/UPDATE_FAILED',
    DELETE_START = 'docfile/DELETE_START',
    DELETE_SUCCESS = 'docfile/DELETE_SUCCESS',
    DELETE_FAILED = 'docfile/DELETE_FAILED',
    FETCH_SINGLE_START = 'docfile/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'docfile/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'docfile/FETCH_SINGLE_FAILED',
    FETCH_ALL_USER_START = 'docfile/FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS = 'docfile/FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED = 'docfile/FETCH_ALL_USER_FAILED',
    FETCH_ALL_START = 'docfile/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'docfile/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'docfile/FETCH_ALL_FAILED'
};

export type DocFile = {
    docFileId: number | null;
    title: string | null;
    xCoord: number | null;
    yCoord: number | null;
    dateCreated: Date;
    notes: Note[];
}
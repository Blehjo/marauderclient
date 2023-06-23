export enum NOTE_ACTION_TYPES {
    CREATE_START = 'note/CREATE_START',
    CREATE_SUCCESS = 'note/CREATE_SUCCESS',
    CREATE_FAILED = 'note/CREATE_FAILED',
    UPDATE_START = 'note/UPDATE_START',
    UPDATE_SUCCESS = 'note/UPDATE_SUCCESS',
    UPDATE_FAILED = 'note/UPDATE_FAILED',
    DELETE_START = 'note/DELETE_START',
    DELETE_SUCCESS = 'note/DELETE_SUCCESS',
    DELETE_FAILED = 'note/DELETE_FAILED',
    FETCH_ALL_START = 'note/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'note/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'note/FETCH_ALL_FAILED',
};

export type Note = {
    noteId: number | null;
    noteValue: string | null;
    dateCreated: Date;
    panelId: number | null;
}
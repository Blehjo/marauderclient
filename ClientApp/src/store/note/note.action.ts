import { NOTE_ACTION_TYPES, Note } from './note.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type NoteCreateStart = ActionWithPayload<
    NOTE_ACTION_TYPES.CREATE_START, { panelId: number, noteValue: string, xCoord?: number, yCoord?: number, imageFile?: File }
>;

export type NoteCreateSuccess = ActionWithPayload<
    NOTE_ACTION_TYPES.CREATE_SUCCESS, 
    Note[]
>;

export type NoteCreateFailed = ActionWithPayload<
    NOTE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type NoteUpdateStart = ActionWithPayload<
    NOTE_ACTION_TYPES.UPDATE_START,
    { noteId: number, noteValue: string, xCoord: number, yCoord: number, imageFile: File, panelId: number }
>;

export type NoteUpdateSuccess = ActionWithPayload<
    NOTE_ACTION_TYPES.UPDATE_SUCCESS, 
    Note[]
>;

export type NoteUpdateFailed = ActionWithPayload<
    NOTE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type NoteDeleteStart = ActionWithPayload<
    NOTE_ACTION_TYPES.DELETE_START,
    { noteId: number }
>;

export type NoteDeleteSuccess = ActionWithPayload<
    NOTE_ACTION_TYPES.DELETE_SUCCESS, 
    Note[]
>;

export type NoteDeleteteFailed = ActionWithPayload<
    NOTE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type NoteFetchSingleStart = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_SINGLE_START,
    { noteId: number }
>;

export type NoteFetchSingleSuccess = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Note
>;

export type NoteFetchSingleFailed = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type NoteFetchAllStart = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_ALL_START, {
        panelId: number
    }
>;

export type NoteFetchAllSuccess = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Note[]
>;

export type NoteFetchAllFailed = ActionWithPayload<
    NOTE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const noteCreateStart = withMatcher(
    (panelId: number, noteValue: string, xCoord?: number, yCoord?: number, imageFile?: File ): NoteCreateStart => 
    createAction(NOTE_ACTION_TYPES.CREATE_START, { noteValue, xCoord, yCoord, imageFile, panelId })
);

export const noteCreateSuccess = withMatcher(
    (note: Note[]): NoteCreateSuccess => 
    createAction(NOTE_ACTION_TYPES.CREATE_SUCCESS, note)
);

export const noteCreateFailed = withMatcher(
    (error: Error) => 
    createAction(NOTE_ACTION_TYPES.CREATE_START, error)
);
 
export const noteUpdateStart = withMatcher(
    (noteId: number, noteValue: string, xCoord: number, yCoord: number, imageFile: File, panelId: number): NoteUpdateStart => 
    createAction(NOTE_ACTION_TYPES.UPDATE_START, { noteId, noteValue, xCoord, yCoord, imageFile, panelId })
);

export const noteUpdateSuccess = withMatcher(
    (note: Note[]): NoteUpdateSuccess => 
    createAction(NOTE_ACTION_TYPES.UPDATE_SUCCESS, note)
);

export const noteUpdateFailed = withMatcher(
    (error: Error): NoteUpdateFailed => 
    createAction(NOTE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const noteDeleteStart = withMatcher(
    (noteId: number): NoteDeleteStart => 
    createAction(NOTE_ACTION_TYPES.DELETE_START, { noteId })
);

export const noteDeleteSuccess = withMatcher(
    (note: Note[]): NoteDeleteSuccess => 
    createAction(NOTE_ACTION_TYPES.DELETE_SUCCESS, note)
);

export const noteDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(NOTE_ACTION_TYPES.DELETE_START, error)
);

export const noteFetchSingleStart = withMatcher(
    (noteId: number): NoteFetchSingleStart => 
    createAction(NOTE_ACTION_TYPES.FETCH_SINGLE_START, { noteId })
);

export const noteFetchSingleSuccess = withMatcher(
    (note: Note): NoteFetchSingleSuccess => 
    createAction(NOTE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, note)
);

export const noteFetchSingleFailed = withMatcher(
    (error: Error): NoteFetchSingleFailed => 
    createAction(NOTE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const noteFetchAllStart = withMatcher(
    (panelId: number): NoteFetchAllStart => 
    createAction(NOTE_ACTION_TYPES.FETCH_ALL_START, { panelId })
);

export const noteFetchAllSuccess = withMatcher(
    (notes: Note[]): NoteFetchAllSuccess => 
    createAction(NOTE_ACTION_TYPES.FETCH_ALL_SUCCESS, notes)
);

export const noteFetchAllFailed = withMatcher(
    (error: Error): NoteFetchAllFailed => 
    createAction(NOTE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
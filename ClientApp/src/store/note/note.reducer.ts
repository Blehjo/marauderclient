import { AnyAction } from 'redux';

import { Note } from './note.types';

import {
    noteCreateFailed,
    noteCreateSuccess,
    noteDeleteFailed,
    noteDeleteSuccess,
    noteFetchAllFailed,
    noteFetchAllStart,
    noteFetchAllSuccess,
    noteFetchSingleFailed,
    noteFetchSingleSuccess,
    noteUpdateFailed,
    noteUpdateSuccess
} from './note.action';

export type NoteState = {
    readonly noteId: number | null;
    readonly singleNote: Note | null;
    readonly userNotes: Note[];
    readonly notes: Note[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: NoteState = {
    noteId: null,
    singleNote: null,
    userNotes: [],
    notes: [],
    isLoading: false,
    error: null,
};

export const noteReducer = (
    state = INITIAL_STATE, action: AnyAction
): NoteState => {
    if (
        noteFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        noteFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleNote: action.payload }
    }
    if (
        noteCreateSuccess.match(action) ||
        noteUpdateSuccess.match(action) ||
        noteDeleteSuccess.match(action) ||
        noteFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, notes: action.payload };
    } 
    if (
        noteCreateFailed.match(action) ||
        noteUpdateFailed.match(action) ||
        noteDeleteFailed.match(action) ||
        noteFetchSingleFailed.match(action) ||
        noteFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
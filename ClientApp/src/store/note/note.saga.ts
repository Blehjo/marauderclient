import { all, call, put, takeLatest } from 'typed-redux-saga';

import { NOTE_ACTION_TYPES } from './note.types';

import {
    noteCreateFailed,
    noteCreateSuccess,
    noteDeleteFailed,
    noteDeleteSuccess,
    noteFetchAllFailed,
    noteFetchAllSuccess,
    noteFetchSingleFailed,
    noteFetchSingleSuccess,
    noteUpdateSuccess,
    NoteCreateStart,
    NoteDeleteStart,
    NoteUpdateStart,
    NoteFetchSingleStart,
    NoteFetchAllStart
} from './note.action';

import {
    addNote,
    deleteNote,
    editNote,
    getAllNotes,
    getSingleNote
} from '../../utils/api/note.api';

export function* createNote({ payload: { panelId, noteValue, xCoord, yCoord, imageFile }}: NoteCreateStart ) {
    const formData = new FormData();
    formData.append('noteValue', noteValue);
    if (imageFile != undefined) {
        formData.append('imageFile', imageFile);
    }
    try {
        const notes = yield* call(
            addNote,
            panelId,
            formData,
            xCoord,
            yCoord
        ); 
        yield* put(noteCreateSuccess(notes));
    } catch (error) {
        yield* put(noteCreateFailed(error as Error));
    }
}

export function* updateNote({ payload: { noteId, xCoord, yCoord, noteValue, imageFile, panelId }}: NoteUpdateStart) {
    const formData = new FormData();
    formData.append('noteValue', noteValue);
    formData.append('imageFile', imageFile);
    try {
        const comment = yield* call(
            editNote,
            noteId,
            xCoord, 
            yCoord,
            formData,
            panelId
        ); 
        yield* put(noteUpdateSuccess(comment));
    } catch (error) {
        yield* put(noteCreateFailed(error as Error));
    }
}

export function* removeNote({ payload: { noteId }}: NoteDeleteStart) {
    try {
        const notes = yield* call(
            deleteNote,
            noteId
        ); 
        yield* put(noteDeleteSuccess(notes));
    } catch (error) {
        yield* put(noteDeleteFailed(error as Error));
    }
}

export function* fetchSingleNote({ 
    payload: { noteId } }: NoteFetchSingleStart) {
    try {
        const note = yield* call(
            getSingleNote,
            noteId 
        );
        yield* put(noteFetchSingleSuccess(note));
    } catch (error) {
        yield* put(noteFetchSingleFailed(error as Error));
    }
}

export function* fetchAllNotes({
    payload: { panelId } }: NoteFetchAllStart) {
    try {
        const notes = yield* call(getAllNotes, panelId);
        yield* put(noteFetchAllSuccess(notes));
    } catch (error) {
        yield* put(noteFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        NOTE_ACTION_TYPES.CREATE_START, 
        createNote
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        NOTE_ACTION_TYPES.UPDATE_START, 
        updateNote
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        NOTE_ACTION_TYPES.DELETE_START, 
        removeNote
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        NOTE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleNote
    );
}
  
export function* onFetchStart() {
    yield* takeLatest(
        NOTE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllNotes
    );
}

export function* noteSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchStart)
    ]);
}
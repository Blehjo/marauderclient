import { createSelector } from 'reselect';

import { RootState } from '../store';
import { NoteState } from './note.reducer';

export const selectNoteReducer = (state: RootState): NoteState => state.note;

export const selectIsNoteLoading = createSelector(
    [selectNoteReducer],
    (note) => note.isLoading
);

export const selectNoteId = createSelector(
    [selectNoteReducer],
    (note) => note.noteId
);

export const selectSingleNote = createSelector(
    [selectNoteReducer],
    (note) => note.singleNote
);

export const selectUserNotes = createSelector(
    [selectNoteReducer],
    (note) => note.userNotes
);

export const selectAllNotes = createSelector(
    [selectNoteReducer],
    (note) => note.notes
);
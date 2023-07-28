import { createSelector } from 'reselect';

import { RootState } from '../store';
import { EditorState } from './editor.reducer';

export const selectEditorReducer = (state: RootState): EditorState => state.editor;

export const selectEditorShape = createSelector(
    [selectEditorReducer],
    (editor) => editor.shape
);

export const selectEditorSingleShape = createSelector(
    [selectEditorReducer],
    (editor) => editor.singleShape
);

export const selectEditorShapes = createSelector(
    [selectEditorReducer],
    (editor) => editor.shapes
);

export const selectEditorColor = createSelector(
    [selectEditorReducer],
    (editor) => editor.color
);

export const selectEditorIsGridVisible = createSelector(
    [selectEditorReducer],
    (editor) => editor.grid
);

export const selectEditorIsLoading = createSelector(
    [selectEditorReducer],
    (editor) => editor.isLoading
);
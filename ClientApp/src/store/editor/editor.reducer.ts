import { AnyAction } from 'redux';


import {
    addShape,
    editorCreateStart,
    editorCreateSuccess,
    editorFetchAllStart,
    editorFetchAllSuccess,
    editorFetchSingleStart,
    editorFetchSingleSuccess,
    setBrick,
    setColor,
    setShape,
    toggleGrid
} from './editor.action';

import { Editor } from './editor.types';

export type EditorState = {
    readonly shape: string;
    readonly singleShape: Editor | null;
    readonly shapes: Array<Editor>;
    readonly grid: boolean;
    readonly color: string;
    readonly isLoading: boolean;
}

const INITIAL_STATE: EditorState = {
    shape: "box",
    singleShape: null,
    shapes: [],
    grid: true,
    color: 'red',
    isLoading: false
};

export const editorReducer = (
    state = INITIAL_STATE, action: AnyAction
): EditorState => {
    if (
        setShape.match(action)
    ) {
        return { ...state, isLoading: false, shape: action.payload.shape }
    }
    if (
        addShape.match(action)
    ) {
        return { ...state, isLoading: false }
    }
    if (
        toggleGrid.match(action)
    ) {
        return { ...state, isLoading: false, grid: state.grid };
    } 
    if (
        setColor.match(action)
    ) {
        return { ...state, isLoading: false, color: state.color };
    } 
    if (
        editorCreateStart.match(action) ||
        editorFetchSingleStart.match(action) ||
        editorFetchAllStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        editorCreateSuccess.match(action) || 
        editorFetchAllSuccess.match(action)
    )   {
        return { ...state, isLoading: false, shapes: action.payload}
    }
    if (
        editorFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleShape: action.payload };
    }
  
    return state;
};
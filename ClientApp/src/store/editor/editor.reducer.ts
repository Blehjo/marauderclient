import { AnyAction } from 'redux';


import {
    addShape,
    setBrick,
    setColor,
    setShape,
    toggleGrid
} from './editor.action';


export type EditorState = {
    readonly shape: string;
    readonly shapes: Array<string>;
    readonly grid: boolean;
    readonly color: string;
    readonly isLoading: boolean;
}

const INITIAL_STATE: EditorState = {
    shape: "box",
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
    // if (
    //     setBrick.match(action) 
    // ) {
    //     return { ...state, isLoading: false, brick: action.payload.brick };
    // }
  
    return state;
};
import { all, call, put, takeLatest } from 'typed-redux-saga';

import { Editor, EDITOR_ACTION_TYPES } from './editor.types';

import {
    editorCreateFailed,
    EditorCreateStart,
    editorCreateSuccess,
    editorDeleteFailed,
    EditorDeleteStart,
    editorDeleteSuccess,
    editorFetchAllFailed,
    editorFetchAllSuccess,
    editorFetchSingleFailed,
    EditorFetchSingleShapesStart,
    editorFetchSingleShapesSuccess,
    EditorFetchSingleStart,
    editorFetchSingleSuccess,
    editorFetchUsersFailed,
    editorFetchUsersSuccess,
    EditorUpdateStart,
    editorUpdateSuccess
} from './editor.action';

import {
    addShape,
    deleteShape,
    editShape,
    getAllShapes,
    getSingleShape,
    getSingleShapes,
    getUsersShapes
} from '../../utils/api/shape.api';

export function* createShape({ payload: { shapeName, gltfId, position, height, width, depth, radius, length, color, colorValue }}: EditorCreateStart ) {
    try {
        const editor = yield* call(
            addShape,
            shapeName,
            gltfId,
            position, 
            height, 
            width, 
            depth, 
            radius, 
            length, 
            color,
            colorValue
        ); 
        yield* put(editorCreateSuccess(editor));
    } catch (error) {
        yield* put(editorCreateFailed(error as Error));
    }
}

export function* updateShape({ payload: { editorId, shapeName, gltfId, position, height, width, depth, radius, length, color, colorValue }}: EditorUpdateStart) {
    try {
        const editor = yield* call(
            editShape,
            editorId,
            shapeName,
            gltfId,
            position, 
            height, 
            width, 
            depth, 
            radius, 
            length, 
            color,
            colorValue
        ); 
        yield* put(editorUpdateSuccess(editor));
    } catch (error) {
        yield* put(editorCreateFailed(error as Error));
    }
}

export function* removeShape({ payload: { editorId }}: EditorDeleteStart) {
    try {
        const editors = yield* call(
            deleteShape,
            editorId
        ); 
        yield* put(editorDeleteSuccess(editors));
    } catch (error) {
        yield* put(editorDeleteFailed(error as Error));
    }
}

export function* fetchUserShapes() {
    try {
        const editor = yield* call(getUsersShapes);
        if (!editor) return;
        yield* put(editorFetchUsersSuccess(editor));
    } catch (error) {
        yield* put(editorFetchUsersFailed(error as Error));
    }
}



export function* fetchSingleShapes({ 
    payload: { gltfId } }: EditorFetchSingleShapesStart) {
    try {
        const editorSnapshot = yield* call(
            getSingleShapes,
            gltfId 
        );
        yield* put(editorFetchSingleShapesSuccess(editorSnapshot));
    } catch (error) {
        yield* put(editorFetchSingleFailed(error as Error));
    }
}

export function* fetchSingle({ 
    payload: { shapeId } }: EditorFetchSingleStart) {
    try {
        const editorSnapshot = yield* call(
            getSingleShape,
            shapeId 
        );
        yield* put(editorFetchSingleSuccess(editorSnapshot));
    } catch (error) {
        yield* put(editorFetchSingleFailed(error as Error));
    }
}

export function* fetchAllShapesAsync() {
    try {
        const editors = yield* call(getAllShapes);
        yield* put(editorFetchAllSuccess(editors));
    } catch (error) {
        yield* put(editorFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.CREATE_START, 
        createShape
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.UPDATE_START, 
        updateShape
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.DELETE_START, 
        removeShape
    );
}

export function* onFetchUserShapesStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_START, 
        fetchUserShapes
    );
}

export function* onFetchSingleShapesStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.FETCH_SINGLE_SHAPES_START, 
        fetchSingleShapes
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingle
    );
}
  
export function* onFetchAllShapesStart() {
    yield* takeLatest(
        EDITOR_ACTION_TYPES.FETCH_ALL_START,
        fetchAllShapesAsync
    );
}

export function* shapeSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserShapesStart),
        call(onFetchSingleStart),
        call(onFetchSingleShapesStart),
        call(onFetchAllShapesStart)
    ]);
}
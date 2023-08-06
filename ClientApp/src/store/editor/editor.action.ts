import { EDITOR_ACTION_TYPES, Editor } from './editor.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { ReactNode } from 'react';
import { Vector3 } from '@react-three/fiber';

export type EditorCreateStart = ActionWithPayload<
    EDITOR_ACTION_TYPES.CREATE_START, { shapeName: string, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string, gltfId: number }
>;

export type EditorCreateSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.CREATE_SUCCESS, 
    Editor[]
>;

export type EditorCreateFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type EditorUpdateStart = ActionWithPayload<
    EDITOR_ACTION_TYPES.UPDATE_START, { editorId: number, shapeName: string, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string, gltfId: number }
>;

export type EditorUpdateSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.UPDATE_SUCCESS, 
    Editor[]
>;

export type EditorUpdateFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type EditorDeleteStart = ActionWithPayload<
    EDITOR_ACTION_TYPES.DELETE_START, { editorId: number }
>;

export type EditorDeleteSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.DELETE_SUCCESS, 
    Editor[]
>;

export type EditorDeleteteFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type EditorFetchSingleStart = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_SINGLE_START, { gltfId: number }
>;

export type EditorFetchSingleSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Editor[]
>;

export type EditorFetchSingleFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type EditorFetchUsersStart = Action<
    EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_START
>;

export type EditorFetchUsersSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_SUCCESS, 
    Editor[]
>;

export type EditorFetchUsersFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_FAILED,
    Error
>;

export type EditorFetchOtherUsersStart = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_START, { userId: number }
>;

export type EditorFetchOtherUsersSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_SUCCESS, 
    Editor[]
>;

export type EditorFetchOtherUsersFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_FAILED,
    Error
>;

export type EditorFetchAllStart = Action<
    EDITOR_ACTION_TYPES.FETCH_ALL_START
>;

export type EditorFetchAllSuccess = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Editor[]
>;

export type EditorFetchAllFailed = ActionWithPayload<
    EDITOR_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type SetShape = ActionWithPayload<
    EDITOR_ACTION_TYPES.SET_SHAPE, { shape: string }
>;

export type AddShape = ActionWithPayload<
    EDITOR_ACTION_TYPES.ADD_SHAPE, { shape: string }
>;

export type SetColor = ActionWithPayload<
    EDITOR_ACTION_TYPES.SET_COLOR, { color: string }
>;

export type ToggleGrid = Action<
    EDITOR_ACTION_TYPES.TOGGLE_GRID
>;

export type SetBrick = ActionWithPayload<
    EDITOR_ACTION_TYPES.SET_BRICK, { editor: Editor }
>;

export const editorCreateStart = withMatcher(
    (shapeName: string, gltfId: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string): EditorCreateStart => 
    createAction(EDITOR_ACTION_TYPES.CREATE_START, { shapeName, gltfId, position, height, width, depth, radius, length, color })
);

export const editorCreateSuccess = withMatcher(
    (editor: Editor[]): EditorCreateSuccess => 
    createAction(EDITOR_ACTION_TYPES.CREATE_SUCCESS, editor)
);

export const editorCreateFailed = withMatcher(
    (error: Error) => 
    createAction(EDITOR_ACTION_TYPES.CREATE_START, error)
);
 
export const editorUpdateStart = withMatcher(
    (editorId: number, shapeName: string, gltfId: number, position?: Vector3, height?: number, width?: number, depth?: number, radius?: number, length?: number, color?: string): EditorUpdateStart => 
    createAction(EDITOR_ACTION_TYPES.UPDATE_START, { editorId, shapeName, gltfId, position, height, width, depth, radius, length, color })
);

export const editorUpdateSuccess = withMatcher(
    (editor: Editor[]): EditorUpdateSuccess => 
    createAction(EDITOR_ACTION_TYPES.UPDATE_SUCCESS, editor)
);

export const editorUpdateFailed = withMatcher(
    (error: Error): EditorUpdateFailed => 
    createAction(EDITOR_ACTION_TYPES.UPDATE_FAILED, error)
);

export const editorDeleteStart = withMatcher(
    (editorId: number): EditorDeleteStart => 
    createAction(EDITOR_ACTION_TYPES.DELETE_START, { editorId })
);

export const editorDeleteSuccess = withMatcher(
    (editor: Editor[]): EditorDeleteSuccess => 
    createAction(EDITOR_ACTION_TYPES.DELETE_SUCCESS, editor)
);

export const editorDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(EDITOR_ACTION_TYPES.DELETE_START, error)
);

export const editorFetchSingleStart = withMatcher(
    (gltfId: number): EditorFetchSingleStart => 
    createAction(EDITOR_ACTION_TYPES.FETCH_SINGLE_START, { gltfId })
);

export const editorFetchSingleSuccess = withMatcher(
    (editor: Editor[]): EditorFetchSingleSuccess => 
    createAction(EDITOR_ACTION_TYPES.FETCH_SINGLE_SUCCESS, editor)
);

export const editorFetchSingleFailed = withMatcher(
    (error: Error): EditorFetchSingleFailed => 
    createAction(EDITOR_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const editorFetchUsersStart = withMatcher(
    (): EditorFetchUsersStart => 
    createAction(EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_START)
);

export const editorFetchUsersSuccess = withMatcher(
    (editor: Editor[]): EditorFetchUsersSuccess => 
    createAction(EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_SUCCESS, editor)
);

export const editorFetchUsersFailed = withMatcher(
    (error: Error): EditorFetchUsersFailed => 
    createAction(EDITOR_ACTION_TYPES.FETCH_USER_EDITOR_FAILED, error)
);

export const editorFetchOtherUsersStart = withMatcher(
    (userId: number): EditorFetchOtherUsersStart => 
    createAction(EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_START, { userId })
);

export const editorFetchOtherUsersSuccess = withMatcher(
    (editor: Editor[]): EditorFetchOtherUsersSuccess => 
    createAction(EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_SUCCESS, editor)
);

export const editorFetchOtherUsersFailed = withMatcher(
    (error: Error): EditorFetchOtherUsersFailed => 
    createAction(EDITOR_ACTION_TYPES.FETCH_OTHER_USER_EDITOR_FAILED, error)
);

export const editorFetchAllStart = withMatcher(
    (): EditorFetchAllStart => 
    createAction(EDITOR_ACTION_TYPES.FETCH_ALL_START)
);

export const editorFetchAllSuccess = withMatcher(
    (editor: Editor[]): EditorFetchAllSuccess => 
    createAction(EDITOR_ACTION_TYPES.FETCH_ALL_SUCCESS, editor)
);

export const editorFetchAllFailed = withMatcher(
    (error: Error): EditorFetchAllFailed => 
    createAction(EDITOR_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const setShape = withMatcher(
    (shape: string): SetShape => 
    createAction(EDITOR_ACTION_TYPES.SET_SHAPE, { shape })
)

export const addShape = withMatcher(
    (shape: string): AddShape => 
    createAction(EDITOR_ACTION_TYPES.ADD_SHAPE, { shape })
)

export const setColor = withMatcher(
    (color: string): SetColor => 
    createAction(EDITOR_ACTION_TYPES.SET_COLOR, { color })
)

export const toggleGrid = withMatcher(
    (): ToggleGrid => 
    createAction(EDITOR_ACTION_TYPES.TOGGLE_GRID)
)

export const setBrick = withMatcher(
    (editor: Editor): SetBrick => 
    createAction(EDITOR_ACTION_TYPES.SET_BRICK, { editor })
)
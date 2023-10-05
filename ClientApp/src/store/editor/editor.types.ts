export enum EDITOR_ACTION_TYPES  {
    CREATE_START = 'editor/CREATE_START',
    CREATE_SUCCESS = 'editor/CREATE_SUCCESS',
    CREATE_FAILED = 'editor/CREATE_FAILED',
    UPDATE_START = 'editor/UPDATE_START',
    UPDATE_SUCCESS = 'editor/UPDATE_SUCCESS',
    UPDATE_FAILED = 'editor/UPDATE_FAILED',
    DELETE_START = 'editor/DELETE_START',
    DELETE_SUCCESS = 'editor/DELETE_SUCCESS',
    DELETE_FAILED = 'editor/DELETE_FAILED',
    FETCH_SINGLE_START = 'editor/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'editor/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'editor/FETCH_SINGLE_FAILED',
    FETCH_USER_EDITOR_START = 'editor/FETCH_USER_EDITOR_START',
    FETCH_USER_EDITOR_SUCCESS = 'editor/FETCH_USER_EDITOR_SUCCESS',
    FETCH_USER_EDITOR_FAILED = 'editor/FETCH_USER_EDITOR_FAILED',
    FETCH_OTHER_USER_EDITOR_START = 'editor/FETCH_OTHER_USER_EDITOR_START',
    FETCH_OTHER_USER_EDITOR_SUCCESS = 'editor/FETCH_OTHER_USER_EDITOR_SUCCESS',
    FETCH_OTHER_USER_EDITOR_FAILED = 'editor/FETCH_OTHER_USER_EDITOR_FAILED',
    FETCH_ALL_START = 'editor/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'editor/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'editor/FETCH_ALL_FAILED',
    SET_SHAPE = 'editor/SET_SHAPE',
    ADD_SHAPE = 'editor/ADD_SHAPE',
    SET_COLOR = 'editor/SET_COLOR',
    TOGGLE_GRID = 'editor/TOGGLE_GRID',
    SET_BRICK = 'editor/SET_BRICK'
};

export type Editor = {
    shapeId: number;
    shapeName: string;
    positionX: number;
    positionY: number;
    positionZ: number;
    height?: number;
    width?: number;
    depth?: number;
    radius?: number;
    length?: number;
    color: string;
    grid: boolean;
    isLoading: boolean;
}
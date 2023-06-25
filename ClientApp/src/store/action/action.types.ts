export enum ACTION_TYPES {
    CREATE_START = 'action/CREATE_START',
    CREATE_SUCCESS = 'action/CREATE_SUCCESS',
    CREATE_FAILED = 'action/CREATE_FAILED',
    UPDATE_START = 'action/UPDATE_START',
    UPDATE_SUCCESS = 'action/UPDATE_SUCCESS',
    UPDATE_FAILED = 'action/UPDATE_FAILED',
    DELETE_START = 'action/DELETE_START',
    DELETE_SUCCESS = 'action/DELETE_SUCCESS',
    DELETE_FAILED = 'action/DELETE_FAILED',
    FETCH_SINGLE_START = 'action/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'action/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'action/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'action/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'action/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'action/FETCH_ALL_FAILED',
};

export type Action = {
    actionId: number | null;
    eventType: string | null;
    activity: string | null;
    pinId: number | null;
}
import { MOVEABLE_ACTION_TYPES, Moveable } from './moveable.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type MoveableCreateStart = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.CREATE_START, { xCoord: number, yCoord: number, zCoord: number, fileId: number }
>;

export type MoveableCreateSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.CREATE_SUCCESS, 
    Moveable[]
>;

export type MoveableCreateFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MoveableUpdateStart = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.UPDATE_START,
    { moveableId: number, xCoord: number, yCoord: number, zCoord: number, fileId: number }
>;

export type MoveableUpdateSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.UPDATE_SUCCESS, 
    Moveable[]
>;

export type MoveableUpdateFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MoveableDeleteStart = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.DELETE_START,
    { moveableId: number }
>;

export type MoveableDeleteSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.DELETE_SUCCESS, 
    Moveable[]
>;

export type MoveableDeleteteFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MoveableFetchSingleStart = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_SINGLE_START,
    { moveableId: number }
>;

export type MoveableFetchSingleSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Moveable
>;

export type MoveableFetchSingleFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MoveableFetchAllUserStart = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_START, { userId: number }
>;

export type MoveableFetchAllUserSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, 
    Moveable[]
>;

export type MoveableFetchAllUserFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_FAILED,
    Error
>;

export type MoveableFetchAllStart = Action<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_START
>;

export type MoveableFetchAllSuccess = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Moveable[]
>;

export type MoveableFetchAllFailed = ActionWithPayload<
    MOVEABLE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const moveableCreateStart = withMatcher(
    (xCoord: number, yCoord: number, zCoord: number, fileId: number): MoveableCreateStart => 
    createAction(MOVEABLE_ACTION_TYPES.CREATE_START, { xCoord, yCoord, zCoord, fileId })
);

export const moveableCreateSuccess = withMatcher(
    (moveable: Moveable[]): MoveableCreateSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.CREATE_SUCCESS, moveable)
);

export const moveableCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MOVEABLE_ACTION_TYPES.CREATE_START, error)
);
 
export const moveableUpdateStart = withMatcher(
    (moveableId: number, xCoord: number, yCoord: number, zCoord: number, fileId: number ): MoveableUpdateStart => 
    createAction(MOVEABLE_ACTION_TYPES.UPDATE_START, { moveableId, xCoord, yCoord, zCoord, fileId })
);

export const moveableUpdateSuccess = withMatcher(
    (moveable: Moveable[]): MoveableUpdateSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.UPDATE_SUCCESS, moveable)
);

export const moveableUpdateFailed = withMatcher(
    (error: Error): MoveableUpdateFailed => 
    createAction(MOVEABLE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const moveableDeleteStart = withMatcher(
    (moveableId: number): MoveableDeleteStart => 
    createAction(MOVEABLE_ACTION_TYPES.DELETE_START, { moveableId })
);

export const moveableDeleteSuccess = withMatcher(
    (moveable: Moveable[]): MoveableDeleteSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.DELETE_SUCCESS, moveable)
);

export const moveableDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MOVEABLE_ACTION_TYPES.DELETE_START, error)
);

export const moveableFetchSingleStart = withMatcher(
    (moveableId: number): MoveableFetchSingleStart => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_SINGLE_START, { moveableId })
);

export const moveableFetchSingleSuccess = withMatcher(
    (moveable: Moveable): MoveableFetchSingleSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, moveable)
);

export const moveableFetchSingleFailed = withMatcher(
    (error: Error): MoveableFetchSingleFailed => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const moveableFetchAllUserStart = withMatcher(
    (userId: number): MoveableFetchAllUserStart => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_START, { userId })
);

export const moveableFetchAllUserSuccess = withMatcher(
    (moveables: Moveable[]): MoveableFetchAllUserSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, moveables)
);

export const moveableFetchAllUserFailed = withMatcher(
    (error: Error): MoveableFetchAllUserFailed => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_USER_FAILED, error)
);

export const moveableFetchAllStart = withMatcher(
    (): MoveableFetchAllStart => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_START)
);

export const moveableFetchAllSuccess = withMatcher(
    (moveables: Moveable[]): MoveableFetchAllSuccess => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_SUCCESS, moveables)
);

export const moveableFetchAllFailed = withMatcher(
    (error: Error): MoveableFetchAllFailed => 
    createAction(MOVEABLE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
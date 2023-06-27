import { AnyAction } from 'redux';

import { Moveable } from './moveable.types';

import {
    moveableCreateFailed,
    moveableCreateSuccess,
    moveableDeleteFailed,
    moveableDeleteSuccess,
    moveableFetchAllFailed,
    moveableFetchAllStart,
    moveableFetchAllSuccess,
    moveableFetchSingleFailed,
    moveableFetchSingleSuccess,
    moveableUpdateFailed,
    moveableUpdateSuccess
} from './moveable.action';

export type MoveableState = {
    readonly moveableId: number | null;
    readonly singleMoveable: Moveable | null;
    readonly userMoveables: Moveable[];
    readonly moveables: Moveable[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: MoveableState = {
    moveableId: null,
    singleMoveable: null,
    userMoveables: [],
    moveables: [],
    isLoading: false,
    error: null,
};

export const moveableReducer = (
    state = INITIAL_STATE, action: AnyAction
): MoveableState => {
    if (
        moveableFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        moveableFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleMoveable: action.payload }
    }
    if (
        moveableCreateSuccess.match(action) ||
        moveableUpdateSuccess.match(action) ||
        moveableDeleteSuccess.match(action) ||
        moveableFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, moveables: action.payload };
    } 
    if (
        moveableCreateFailed.match(action) ||
        moveableUpdateFailed.match(action) ||
        moveableDeleteFailed.match(action) ||
        moveableFetchSingleFailed.match(action) ||
        moveableFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
import { AnyAction } from 'redux';

import { Builder } from './builder.types';

import {
    builderCreateStart,
    builderCreateSuccess,
    builderCreateFailed,
    builderUpdateStart,
    builderUpdateSuccess,
    builderUpdateFailed,
    builderDeleteStart,
    builderDeleteSuccess,
    builderDeleteFailed,
    builderFetchSingleStart,
    builderFetchSingleSuccess,
    builderFetchSingleFailed,
    builderFetchAllStart,
    builderFetchAllSuccess,
    builderFetchAllFailed,
    builderFetchUsersStart,
    builderFetchOtherUsersStart,
    builderFetchUsersSuccess,
    setMode,
    setColor,
    toggleGrid,
    setBrick,
} from './builder.action';

import { bricks, colors } from '../../utils/threejs/constants';

export type Brick = {
    customId?: number;
    x: number; 
    z: number;
}

export type BuilderState = {
    readonly mode: string;
    readonly grid: boolean;
    readonly color: string;
    readonly brick: Brick;
    readonly isLoading: boolean;
}

const INITIAL_STATE: BuilderState = {
    mode: "build",
    grid: true,
    color: colors[0],
    brick: bricks[0],
    isLoading: false
};

export const builderReducer = (
    state = INITIAL_STATE, action: AnyAction
): BuilderState => {
    if (
        setMode.match(action)
    ) {
        return { ...state, isLoading: false, mode: action.payload.mode }
    }
    if (
        setColor.match(action)
    ) {
        return { ...state, isLoading: false, color: action.payload.color };
    } 
    if (
        toggleGrid.match(action)
    ) {
        return { ...state, isLoading: false, grid: !state.grid };
    } 
    if (
        setBrick.match(action) 
    ) {
        return { ...state, isLoading: false, brick: action.payload.brick };
    }
  
    return state;
};
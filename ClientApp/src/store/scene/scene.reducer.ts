import { AnyAction } from 'redux';

import { Scene } from './scene.types';

import {
    sceneCreateStart,
    sceneCreateSuccess,
    sceneCreateFailed,
    sceneUpdateStart,
    sceneUpdateSuccess,
    sceneUpdateFailed,
    sceneDeleteStart,
    sceneDeleteSuccess,
    sceneDeleteFailed,
    sceneFetchSingleStart,
    sceneFetchSingleSuccess,
    sceneFetchSingleFailed,
    sceneFetchAllStart,
    sceneFetchAllSuccess,
    sceneFetchAllFailed,
    sceneFetchUsersStart,
    sceneFetchOtherUsersStart,
    sceneFetchUsersSuccess,
    addBrick,
    removeBrick,
    updateBrick,
    resetScene,
    setScene,
} from './scene.action';
import { Brick } from '../builder/builder.reducer';

export type SceneState = {
    bricks: Brick[],
    isLoading: boolean
}

const INITIAL_STATE: SceneState = {
    bricks: [],
    isLoading: false
};

export const sceneReducer = (
    state = INITIAL_STATE, action: AnyAction
): SceneState => {
    if (
        addBrick.match(action)
    ) {
        const { brick } = action.payload;
        return { ...state, bricks: [ ...state.bricks, brick ] }
    }
    if (
        removeBrick.match(action)
    ) {
        const { id } = action.payload;
        return { ...state, bricks: state.bricks.filter((b) => b.customId !== id) };
    } 
    if (
        updateBrick.match(action)
    ) {
        const { brick } = action.payload;
        const filteredBricks = state.bricks.filter((b) => b.customId !== brick.customId);
        return { ...state, bricks: [ ...filteredBricks, brick ] };
    } 
    if (
        resetScene.match(action) 
    ) {
        return state;
    } 
    if (
        setScene.match(action)
    ) {
        const { bricks } = action.payload;
        return { ...state, bricks: bricks };
    }
  
    return state;
};
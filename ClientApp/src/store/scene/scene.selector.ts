import { createSelector } from 'reselect';

import { RootState } from '../store';
import { SceneState } from './scene.reducer';

export const selectSceneReducer = (state: RootState): SceneState => state.scene;

export const selectSceneBricks = createSelector(
    [selectSceneReducer],
    (scene) => scene.bricks
);
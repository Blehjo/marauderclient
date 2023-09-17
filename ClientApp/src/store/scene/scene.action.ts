import { SCENE_ACTION_TYPES, Scene } from './scene.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

import { Brick } from '../builder/builder.reducer';

export type SceneCreateStart = ActionWithPayload<
    SCENE_ACTION_TYPES.CREATE_START, { name: string, role: string, imageFile: File }
>;

export type SceneCreateSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.CREATE_SUCCESS, 
    Scene[]
>;

export type SceneCreateFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type SceneUpdateStart = ActionWithPayload<
    SCENE_ACTION_TYPES.UPDATE_START, { SceneId: number, name: string, role: string, imageFile: File }
>;

export type SceneUpdateSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.UPDATE_SUCCESS, 
    Scene[]
>;

export type SceneUpdateFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type SceneDeleteStart = ActionWithPayload<
    SCENE_ACTION_TYPES.DELETE_START, { SceneId: number }
>;

export type SceneDeleteSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.DELETE_SUCCESS, 
    Scene[]
>;

export type SceneDeleteteFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type SceneFetchSingleStart = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_SINGLE_START, { SceneId: number }
>;

export type SceneFetchSingleSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Scene
>;

export type SceneFetchSingleFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type SceneFetchUsersStart = Action<
    SCENE_ACTION_TYPES.FETCH_USER_SCENE_START
>;

export type SceneFetchUsersSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_USER_SCENE_SUCCESS, 
    Scene[]
>;

export type SceneFetchUsersFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_USER_SCENE_FAILED,
    Error
>;

export type SceneFetchOtherUsersStart = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_START, { userId: string }
>;

export type SceneFetchOtherUsersSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_SUCCESS, 
    Scene[]
>;

export type SceneFetchOtherUsersFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_FAILED,
    Error
>;

export type SceneFetchAllStart = Action<
    SCENE_ACTION_TYPES.FETCH_ALL_START
>;

export type SceneFetchAllSuccess = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Scene[]
>;

export type SceneFetchAllFailed = ActionWithPayload<
    SCENE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type AddBrick = ActionWithPayload<
    SCENE_ACTION_TYPES.ADD_BRICK, { brick: Brick }
>;

export type RemoveBrick = ActionWithPayload<
    SCENE_ACTION_TYPES.REMOVE_BRICK, { id: number }
>;

export type UpdateBrick = ActionWithPayload<
    SCENE_ACTION_TYPES.UPDATE_BRICK, { brick: Brick }
>;

export type ResetScene = Action<
    SCENE_ACTION_TYPES.RESET_SCENE
>;

export type SetScene = ActionWithPayload<
    SCENE_ACTION_TYPES.SET_SCENE, { bricks: Brick[] }
>;

export const sceneCreateStart = withMatcher(
    (name: string, role: string, imageFile: File): SceneCreateStart => 
    createAction(SCENE_ACTION_TYPES.CREATE_START, { name, role, imageFile})
);

export const sceneCreateSuccess = withMatcher(
    (Scene: Scene[]): SceneCreateSuccess => 
    createAction(SCENE_ACTION_TYPES.CREATE_SUCCESS, Scene)
);

export const sceneCreateFailed = withMatcher(
    (error: Error) => 
    createAction(SCENE_ACTION_TYPES.CREATE_START, error)
);
 
export const sceneUpdateStart = withMatcher(
    (SceneId: number, name: string, role: string, imageFile: File): SceneUpdateStart => 
    createAction(SCENE_ACTION_TYPES.UPDATE_START, { SceneId, name, role, imageFile})
);

export const sceneUpdateSuccess = withMatcher(
    (Scene: Scene[]): SceneUpdateSuccess => 
    createAction(SCENE_ACTION_TYPES.UPDATE_SUCCESS, Scene)
);

export const sceneUpdateFailed = withMatcher(
    (error: Error): SceneUpdateFailed => 
    createAction(SCENE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const sceneDeleteStart = withMatcher(
    (SceneId: number): SceneDeleteStart => 
    createAction(SCENE_ACTION_TYPES.DELETE_START, { SceneId })
);

export const sceneDeleteSuccess = withMatcher(
    (Scene: Scene[]): SceneDeleteSuccess => 
    createAction(SCENE_ACTION_TYPES.DELETE_SUCCESS, Scene)
);

export const sceneDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(SCENE_ACTION_TYPES.DELETE_START, error)
);

export const sceneFetchSingleStart = withMatcher(
    (SceneId: number): SceneFetchSingleStart => 
    createAction(SCENE_ACTION_TYPES.FETCH_SINGLE_START, { SceneId })
);

export const sceneFetchSingleSuccess = withMatcher(
    (Scene: Scene): SceneFetchSingleSuccess => 
    createAction(SCENE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Scene)
);

export const sceneFetchSingleFailed = withMatcher(
    (error: Error): SceneFetchSingleFailed => 
    createAction(SCENE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const sceneFetchUsersStart = withMatcher(
    (): SceneFetchUsersStart => 
    createAction(SCENE_ACTION_TYPES.FETCH_USER_SCENE_START)
);

export const sceneFetchUsersSuccess = withMatcher(
    (Scene: Scene[]): SceneFetchUsersSuccess => 
    createAction(SCENE_ACTION_TYPES.FETCH_USER_SCENE_SUCCESS, Scene)
);

export const sceneFetchUsersFailed = withMatcher(
    (error: Error): SceneFetchUsersFailed => 
    createAction(SCENE_ACTION_TYPES.FETCH_USER_SCENE_FAILED, error)
);

export const sceneFetchOtherUsersStart = withMatcher(
    (userId: string): SceneFetchOtherUsersStart => 
    createAction(SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_START, { userId })
);

export const sceneFetchOtherUsersSuccess = withMatcher(
    (Scene: Scene[]): SceneFetchOtherUsersSuccess => 
    createAction(SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_SUCCESS, Scene)
);

export const sceneFetchOtherUsersFailed = withMatcher(
    (error: Error): SceneFetchOtherUsersFailed => 
    createAction(SCENE_ACTION_TYPES.FETCH_OTHER_USER_SCENE_FAILED, error)
);

export const sceneFetchAllStart = withMatcher(
    (): SceneFetchAllStart => 
    createAction(SCENE_ACTION_TYPES.FETCH_ALL_START)
);

export const sceneFetchAllSuccess = withMatcher(
    (Scene: Scene[]): SceneFetchAllSuccess => 
    createAction(SCENE_ACTION_TYPES.FETCH_ALL_SUCCESS, Scene)
);

export const sceneFetchAllFailed = withMatcher(
    (error: Error): SceneFetchAllFailed => 
    createAction(SCENE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const addBrick = withMatcher(
    (brick: Brick): AddBrick => 
    createAction(SCENE_ACTION_TYPES.ADD_BRICK, { brick })
)

export const removeBrick = withMatcher(
    (id: number): RemoveBrick => 
    createAction(SCENE_ACTION_TYPES.REMOVE_BRICK, { id })
)

export const updateBrick = withMatcher(
    (brick: Brick): UpdateBrick => 
    createAction(SCENE_ACTION_TYPES.UPDATE_BRICK, { brick })
)

export const resetScene = withMatcher(
    (): ResetScene => 
    createAction(SCENE_ACTION_TYPES.RESET_SCENE)
)

export const setScene = withMatcher(
    (bricks: Brick[]): SetScene => 
    createAction(SCENE_ACTION_TYPES.SET_SCENE, { bricks })
)
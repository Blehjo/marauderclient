import { BUILDER_ACTION_TYPES, Builder } from './builder.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { Brick } from './builder.reducer';

export type BuilderCreateStart = ActionWithPayload<
    BUILDER_ACTION_TYPES.CREATE_START, { name: string, role: string, imageFile: File }
>;

export type BuilderCreateSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.CREATE_SUCCESS, 
    Builder[]
>;

export type BuilderCreateFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type BuilderUpdateStart = ActionWithPayload<
    BUILDER_ACTION_TYPES.UPDATE_START, { BuilderId: number, name: string, role: string, imageFile: File }
>;

export type BuilderUpdateSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.UPDATE_SUCCESS, 
    Builder[]
>;

export type BuilderUpdateFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type BuilderDeleteStart = ActionWithPayload<
    BUILDER_ACTION_TYPES.DELETE_START, { BuilderId: number }
>;

export type BuilderDeleteSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.DELETE_SUCCESS, 
    Builder[]
>;

export type BuilderDeleteteFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type BuilderFetchSingleStart = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_SINGLE_START, { BuilderId: number }
>;

export type BuilderFetchSingleSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Builder
>;

export type BuilderFetchSingleFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type BuilderFetchUsersStart = Action<
    BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_START
>;

export type BuilderFetchUsersSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_SUCCESS, 
    Builder[]
>;

export type BuilderFetchUsersFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_FAILED,
    Error
>;

export type BuilderFetchOtherUsersStart = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_START, { userId: string }
>;

export type BuilderFetchOtherUsersSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_SUCCESS, 
    Builder[]
>;

export type BuilderFetchOtherUsersFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_FAILED,
    Error
>;

export type BuilderFetchAllStart = Action<
    BUILDER_ACTION_TYPES.FETCH_ALL_START
>;

export type BuilderFetchAllSuccess = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Builder[]
>;

export type BuilderFetchAllFailed = ActionWithPayload<
    BUILDER_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type SetMode = ActionWithPayload<
    BUILDER_ACTION_TYPES.SET_MODE, { mode: string }
>;

export type SetColor = ActionWithPayload<
    BUILDER_ACTION_TYPES.SET_COLOR, { color: string }
>;

export type ToggleGrid = Action<
    BUILDER_ACTION_TYPES.TOGGLE_GRID
>;

export type SetBrick = ActionWithPayload<
    BUILDER_ACTION_TYPES.SET_BRICK, { brick: Brick }
>;

export const builderCreateStart = withMatcher(
    (name: string, role: string, imageFile: File): BuilderCreateStart => 
    createAction(BUILDER_ACTION_TYPES.CREATE_START, { name, role, imageFile})
);

export const builderCreateSuccess = withMatcher(
    (Builder: Builder[]): BuilderCreateSuccess => 
    createAction(BUILDER_ACTION_TYPES.CREATE_SUCCESS, Builder)
);

export const builderCreateFailed = withMatcher(
    (error: Error) => 
    createAction(BUILDER_ACTION_TYPES.CREATE_START, error)
);
 
export const builderUpdateStart = withMatcher(
    (BuilderId: number, name: string, role: string, imageFile: File): BuilderUpdateStart => 
    createAction(BUILDER_ACTION_TYPES.UPDATE_START, { BuilderId, name, role, imageFile})
);

export const builderUpdateSuccess = withMatcher(
    (Builder: Builder[]): BuilderUpdateSuccess => 
    createAction(BUILDER_ACTION_TYPES.UPDATE_SUCCESS, Builder)
);

export const builderUpdateFailed = withMatcher(
    (error: Error): BuilderUpdateFailed => 
    createAction(BUILDER_ACTION_TYPES.UPDATE_FAILED, error)
);

export const builderDeleteStart = withMatcher(
    (BuilderId: number): BuilderDeleteStart => 
    createAction(BUILDER_ACTION_TYPES.DELETE_START, { BuilderId })
);

export const builderDeleteSuccess = withMatcher(
    (Builder: Builder[]): BuilderDeleteSuccess => 
    createAction(BUILDER_ACTION_TYPES.DELETE_SUCCESS, Builder)
);

export const builderDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(BUILDER_ACTION_TYPES.DELETE_START, error)
);

export const builderFetchSingleStart = withMatcher(
    (BuilderId: number): BuilderFetchSingleStart => 
    createAction(BUILDER_ACTION_TYPES.FETCH_SINGLE_START, { BuilderId })
);

export const builderFetchSingleSuccess = withMatcher(
    (Builder: Builder): BuilderFetchSingleSuccess => 
    createAction(BUILDER_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Builder)
);

export const builderFetchSingleFailed = withMatcher(
    (error: Error): BuilderFetchSingleFailed => 
    createAction(BUILDER_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const builderFetchUsersStart = withMatcher(
    (): BuilderFetchUsersStart => 
    createAction(BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_START)
);

export const builderFetchUsersSuccess = withMatcher(
    (Builder: Builder[]): BuilderFetchUsersSuccess => 
    createAction(BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_SUCCESS, Builder)
);

export const builderFetchUsersFailed = withMatcher(
    (error: Error): BuilderFetchUsersFailed => 
    createAction(BUILDER_ACTION_TYPES.FETCH_USER_BUILDER_FAILED, error)
);

export const builderFetchOtherUsersStart = withMatcher(
    (userId: string): BuilderFetchOtherUsersStart => 
    createAction(BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_START, { userId })
);

export const builderFetchOtherUsersSuccess = withMatcher(
    (Builder: Builder[]): BuilderFetchOtherUsersSuccess => 
    createAction(BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_SUCCESS, Builder)
);

export const builderFetchOtherUsersFailed = withMatcher(
    (error: Error): BuilderFetchOtherUsersFailed => 
    createAction(BUILDER_ACTION_TYPES.FETCH_OTHER_USER_BUILDER_FAILED, error)
);

export const builderFetchAllStart = withMatcher(
    (): BuilderFetchAllStart => 
    createAction(BUILDER_ACTION_TYPES.FETCH_ALL_START)
);

export const builderFetchAllSuccess = withMatcher(
    (Builder: Builder[]): BuilderFetchAllSuccess => 
    createAction(BUILDER_ACTION_TYPES.FETCH_ALL_SUCCESS, Builder)
);

export const builderFetchAllFailed = withMatcher(
    (error: Error): BuilderFetchAllFailed => 
    createAction(BUILDER_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const setMode = withMatcher(
    (mode: string): SetMode => 
    createAction(BUILDER_ACTION_TYPES.SET_MODE, { mode })
)

export const setColor = withMatcher(
    (color: string): SetColor => 
    createAction(BUILDER_ACTION_TYPES.SET_COLOR, { color })
)

export const toggleGrid = withMatcher(
    (): ToggleGrid => 
    createAction(BUILDER_ACTION_TYPES.TOGGLE_GRID)
)

export const setBrick = withMatcher(
    (brick: Brick): SetBrick => 
    createAction(BUILDER_ACTION_TYPES.SET_BRICK, { brick })
)
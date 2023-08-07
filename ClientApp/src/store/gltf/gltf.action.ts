import { GLTF_ACTION_TYPES, Gltf } from './gltf.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type GltfCreateStart = ActionWithPayload<
    GLTF_ACTION_TYPES.CREATE_START, { fileInformation: string }
>;

export type GltfCreateSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.CREATE_SUCCESS, 
    Gltf[]
>;

export type GltfCreateFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type GltfUpdateStart = ActionWithPayload<
    GLTF_ACTION_TYPES.UPDATE_START,
    { gltfId: number, fileInformation: string }
>;

export type GltfUpdateSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.UPDATE_SUCCESS, 
    Gltf[]
>;

export type GltfUpdateFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type GltfDeleteStart = ActionWithPayload<
    GLTF_ACTION_TYPES.DELETE_START,
    { gltfId: number }
>;

export type GltfDeleteSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.DELETE_SUCCESS, 
    Gltf[]
>;

export type GltfDeleteteFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type GltfFetchSingleStart = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_SINGLE_START,
    { gltfId: number }
>;

export type GltfFetchSingleSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Gltf
>;

export type GltfFetchSingleFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type GltfFetchAllStart = Action<
    GLTF_ACTION_TYPES.FETCH_ALL_START
>;

export type GltfFetchAllSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Gltf[]
>;

export type GltfFetchAllFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type GltfFetchUserStart = Action<
    GLTF_ACTION_TYPES.FETCH_USER_START
>;

export type GltfFetchUserSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_USER_SUCCESS, 
    Gltf[]
>;

export type GltfFetchUserFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_USER_FAILED,
    Error
>;

export type GltfFetchOtherUserStart = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_USER_START, {
        userId: string
    }
>;

export type GltfFetchOtherUserSuccess = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_USER_SUCCESS, 
    Gltf[]
>;

export type GltfFetchOtherUserFailed = ActionWithPayload<
    GLTF_ACTION_TYPES.FETCH_USER_FAILED,
    Error
>;

export const gltfCreateStart = withMatcher(
    (fileInformation: string): GltfCreateStart => 
    createAction(GLTF_ACTION_TYPES.CREATE_START, { fileInformation })
);

export const gltfCreateSuccess = withMatcher(
    (gltf: Gltf[]): GltfCreateSuccess => 
    createAction(GLTF_ACTION_TYPES.CREATE_SUCCESS, gltf)
);

export const gltfCreateFailed = withMatcher(
    (error: Error) => 
    createAction(GLTF_ACTION_TYPES.CREATE_START, error)
);
 
export const gltfUpdateStart = withMatcher(
    (gltfId: number,  fileInformation: string): GltfUpdateStart => 
    createAction(GLTF_ACTION_TYPES.UPDATE_START, { gltfId, fileInformation })
);

export const gltfUpdateSuccess = withMatcher(
    (gltf: Gltf[]): GltfUpdateSuccess => 
    createAction(GLTF_ACTION_TYPES.UPDATE_SUCCESS, gltf)
);

export const gltfUpdateFailed = withMatcher(
    (error: Error): GltfUpdateFailed => 
    createAction(GLTF_ACTION_TYPES.UPDATE_FAILED, error)
);

export const gltfDeleteStart = withMatcher(
    (gltfId: number): GltfDeleteStart => 
    createAction(GLTF_ACTION_TYPES.DELETE_START, { gltfId })
);

export const gltfDeleteSuccess = withMatcher(
    (gltf: Gltf[]): GltfDeleteSuccess => 
    createAction(GLTF_ACTION_TYPES.DELETE_SUCCESS, gltf)
);

export const gltfDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(GLTF_ACTION_TYPES.DELETE_START, error)
);

export const gltfFetchSingleStart = withMatcher(
    (gltfId: number): GltfFetchSingleStart => 
    createAction(GLTF_ACTION_TYPES.FETCH_SINGLE_START, { gltfId })
);

export const gltfFetchSingleSuccess = withMatcher(
    (gltf: Gltf): GltfFetchSingleSuccess => 
    createAction(GLTF_ACTION_TYPES.FETCH_SINGLE_SUCCESS, gltf)
);

export const gltfFetchSingleFailed = withMatcher(
    (error: Error): GltfFetchSingleFailed => 
    createAction(GLTF_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const gltfFetchUserStart = withMatcher(
    (): GltfFetchUserStart => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_START)
);

export const gltfFetchUserSuccess = withMatcher(
    (gltf: Gltf[]): GltfFetchUserSuccess => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_SUCCESS, gltf)
);

export const gltfFetchUserFailed = withMatcher(
    (error: Error): GltfFetchUserFailed => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_FAILED, error)
);

export const gltfFetchOtherUserStart = withMatcher(
    (userId: string): GltfFetchOtherUserStart => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_START, { userId })
);

export const gltfFetchOtherUserSuccess = withMatcher(
    (gltf: Gltf[]): GltfFetchOtherUserSuccess => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_SUCCESS, gltf)
);

export const gltfFetchOtherUserFailed = withMatcher(
    (error: Error): GltfFetchOtherUserFailed => 
    createAction(GLTF_ACTION_TYPES.FETCH_USER_FAILED, error)
);

export const gltfFetchAllStart = withMatcher(
    (): GltfFetchAllStart => 
    createAction(GLTF_ACTION_TYPES.FETCH_ALL_START)
);

export const gltfFetchAllSuccess = withMatcher(
    (gltf: Gltf[]): GltfFetchAllSuccess => 
    createAction(GLTF_ACTION_TYPES.FETCH_ALL_SUCCESS, gltf)
);

export const gltfFetchAllFailed = withMatcher(
    (error: Error): GltfFetchAllFailed => 
    createAction(GLTF_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
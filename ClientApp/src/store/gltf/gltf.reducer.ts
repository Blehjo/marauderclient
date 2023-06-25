import { AnyAction } from 'redux';

import { Gltf } from './gltf.types';

import {
    gltfCreateFailed,
    gltfCreateSuccess,
    gltfDeleteFailed,
    gltfDeleteSuccess,
    gltfFetchAllFailed,
    gltfFetchAllStart,
    gltfFetchAllSuccess,
    gltfFetchSingleFailed,
    gltfFetchSingleSuccess,
    gltfUpdateFailed,
    gltfUpdateSuccess
} from './gltf.action';

export type GltfState = {
    readonly gltfId: number | null;
    readonly singleGltf: Gltf | null;
    readonly userGltfs: Gltf[];
    readonly gltfs: Gltf[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: GltfState = {
    gltfId: null,
    singleGltf: null,
    userGltfs: [],
    gltfs: [],
    isLoading: false,
    error: null,
};

export const gltfReducer = (
    state = INITIAL_STATE, action: AnyAction
): GltfState => {
    if (
        gltfFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        gltfFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleGltf: action.payload }
    }
    if (
        gltfCreateSuccess.match(action) ||
        gltfUpdateSuccess.match(action) ||
        gltfDeleteSuccess.match(action) ||
        gltfFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, gltfs: action.payload };
    } 
    if (
        gltfCreateFailed.match(action) ||
        gltfUpdateFailed.match(action) ||
        gltfDeleteFailed.match(action) ||
        gltfFetchSingleFailed.match(action) ||
        gltfFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
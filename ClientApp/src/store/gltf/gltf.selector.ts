import { createSelector } from 'reselect';

import { RootState } from '../store';
import { GltfState } from './gltf.reducer';

export const selectGltfReducer = (state: RootState): GltfState => state.gltf;

export const selectIsGltfLoading = createSelector(
    [selectGltfReducer],
    (gltf) => gltf.isLoading
);

export const selectGltfId = createSelector(
    [selectGltfReducer],
    (gltf) => gltf.gltfId
);

export const selectSingleGltf = createSelector(
    [selectGltfReducer],
    (gltf) => gltf.singleGltf
);

export const selectUserGltfs = createSelector(
    [selectGltfReducer],
    (gltf) => gltf.userGltfs
);

export const selectAllGltfs = createSelector(
    [selectGltfReducer],
    (gltf) => gltf.gltfs
);
import { createSelector } from 'reselect';

import { RootState } from '../store';
import { GltfCommentState } from './gltfcomment.reducer';

export const selectCommentReducer = (state: RootState): GltfCommentState => state.gltfcomment;

export const selectCommentId = createSelector(
    [selectCommentReducer],
    (gltfcomment) => gltfcomment.gltfCommentId
);

export const selectSingleComment = createSelector(
    [selectCommentReducer],
    (gltfcomment) => gltfcomment.singleComment
);

export const selectUserComments = createSelector(
    [selectCommentReducer],
    (gltfcomment) => gltfcomment.userComments
);

export const selectAllComments = createSelector(
    [selectCommentReducer],
    (gltfcomment) => gltfcomment.comments
);
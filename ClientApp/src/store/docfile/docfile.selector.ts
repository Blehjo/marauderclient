import { createSelector } from 'reselect';

import { RootState } from '../store';
import { DocFileState } from './docfile.reducer';

export const selectDocFileReducer = (state: RootState): DocFileState => state.docFile;

export const selectIsDocFileLoading = createSelector(
    [selectDocFileReducer],
    (docFile) => docFile.isLoading
);

export const selectDocFileId = createSelector(
    [selectDocFileReducer],
    (docFile) => docFile.docFileId
);

export const selectSingleDocFile = createSelector(
    [selectDocFileReducer],
    (docFile) => docFile.singleDocFile
);

export const selectUserDocFiles = createSelector(
    [selectDocFileReducer],
    (docFile) => docFile.userDocFiles
);

export const selectAllDocFiles = createSelector(
    [selectDocFileReducer],
    (docFile) => docFile.docFiles
);
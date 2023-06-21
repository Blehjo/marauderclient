import { createSelector } from 'reselect';

import { RootState } from '../store';
import { InterfaceState } from './interface.reducer';

export const selectInterfaceReducer = (state: RootState): InterfaceState => state.ui;

export const selectInterfaceItems = createSelector(
    [selectInterfaceReducer],
    (ui) => ui.utilsOpen
);
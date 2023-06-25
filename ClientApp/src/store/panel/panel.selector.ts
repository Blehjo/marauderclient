import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PanelState } from './panel.reducer';

export const selectPanelReducer = (state: RootState): PanelState => state.panel;

export const selectIsMoonCommentLoading = createSelector(
    [selectPanelReducer],
    (panel) => panel.isLoading
);

export const selectPanelId = createSelector(
    [selectPanelReducer],
    (panel) => panel.panelId
);

export const selectSinglePanel = createSelector(
    [selectPanelReducer],
    (panel) => panel.singlePanel
);

export const selectUserPanels = createSelector(
    [selectPanelReducer],
    (panel) => panel.userPanels
);

export const selectAllPanels = createSelector(
    [selectPanelReducer],
    (panel) => panel.panels
);
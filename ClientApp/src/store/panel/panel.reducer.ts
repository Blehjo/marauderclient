import { AnyAction } from 'redux';

import { Panel } from './panel.types';

import {
    panelCreateFailed,
    panelCreateSuccess,
    panelDeleteFailed,
    panelDeleteSuccess,
    panelFetchAllFailed,
    panelFetchAllStart,
    panelFetchAllSuccess,
    panelFetchSingleFailed,
    panelFetchSingleSuccess,
    panelSetIdStart,
    panelSetIdSuccess,
    panelUpdateFailed,
    panelUpdateSuccess
} from './panel.action';

export type PanelState = {
    readonly panelId: number | null;
    readonly singlePanel: Panel | null;
    readonly userPanels: Panel[];
    readonly panels: Panel[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: PanelState = {
    panelId: null,
    singlePanel: null,
    userPanels: [],
    panels: [],
    isLoading: false,
    error: null,
};

export const panelReducer = (
    state = INITIAL_STATE, action: AnyAction
): PanelState => {
    if (
        panelFetchAllStart.match(action) ||
        panelSetIdStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }
    if (
        panelFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singlePanel: action.payload }
    }
    if (
        panelCreateSuccess.match(action) ||
        panelUpdateSuccess.match(action) ||
        panelDeleteSuccess.match(action) ||
        panelFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, panels: action.payload };
    } 
    if (
        panelSetIdSuccess.match(action)
    ) {
        return { ...state, isLoading: false, panelId: action.payload.panelId };
    }
    if (
        panelCreateFailed.match(action) ||
        panelUpdateFailed.match(action) ||
        panelDeleteFailed.match(action) ||
        panelFetchSingleFailed.match(action) ||
        panelFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
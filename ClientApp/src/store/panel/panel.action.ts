import { PANEL_ACTION_TYPES, Panel } from './panel.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type PanelCreateStart = ActionWithPayload<
    PANEL_ACTION_TYPES.CREATE_START, { docFileId: number, title: string, xCoord?: number, yCoord?: number }
>;

export type PanelCreateSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.CREATE_SUCCESS, 
    Panel[]
>;

export type PanelCreateFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PanelUpdateStart = ActionWithPayload<
    PANEL_ACTION_TYPES.UPDATE_START,
    { panelId: number, title: string, xCoord: number, yCoord: number }
>;

export type PanelUpdateSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.UPDATE_SUCCESS, 
    Panel[]
>;

export type PanelUpdateFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PanelDeleteStart = ActionWithPayload<
    PANEL_ACTION_TYPES.DELETE_START,
    { panelId: number }
>;

export type PanelDeleteSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.DELETE_SUCCESS, 
    Panel[]
>;

export type PanelDeleteteFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PanelFetchSingleStart = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_SINGLE_START,
    { panelId: number }
>;

export type PanelFetchSingleSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Panel[]
>;

export type PanelFetchSingleFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PanelFetchAllUserStart = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_ALL_USER_START, { userId: number }
>;

export type PanelFetchAllUserSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, 
    Panel[]
>;

export type PanelFetchAllUserFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_ALL_USER_FAILED,
    Error
>;

export type PanelFetchAllStart = Action<
    PANEL_ACTION_TYPES.FETCH_ALL_START
>;

export type PanelFetchAllSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Panel[]
>;

export type PanelFetchAllFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;


export type PanelSetIdStart = ActionWithPayload<
    PANEL_ACTION_TYPES.SET_ID_START, { panelId: number }
>;

export type PanelSetIdSuccess = ActionWithPayload<
    PANEL_ACTION_TYPES.SET_ID_SUCCESS, 
    { panelId: number }
>;

export type PanelSetIdFailed = ActionWithPayload<
    PANEL_ACTION_TYPES.SET_ID_FAILED,
    Error
>;

export const panelCreateStart = withMatcher(
    (docFileId: number, title: string, xCoord?: number, yCoord?: number ): PanelCreateStart => 
    createAction(PANEL_ACTION_TYPES.CREATE_START, { docFileId, title, xCoord, yCoord })
);

export const panelCreateSuccess = withMatcher(
    (panel: Panel[]): PanelCreateSuccess => 
    createAction(PANEL_ACTION_TYPES.CREATE_SUCCESS, panel)
);

export const panelCreateFailed = withMatcher(
    (error: Error) => 
    createAction(PANEL_ACTION_TYPES.CREATE_START, error)
);
 
export const panelUpdateStart = withMatcher(
    (panelId: number, title: string, xCoord: number, yCoord: number ): PanelUpdateStart => 
    createAction(PANEL_ACTION_TYPES.UPDATE_START, { panelId, title, xCoord, yCoord })
);

export const panelUpdateSuccess = withMatcher(
    (panel: Panel[]): PanelUpdateSuccess => 
    createAction(PANEL_ACTION_TYPES.UPDATE_SUCCESS, panel)
);

export const panelUpdateFailed = withMatcher(
    (error: Error): PanelUpdateFailed => 
    createAction(PANEL_ACTION_TYPES.UPDATE_FAILED, error)
);

export const panelDeleteStart = withMatcher(
    (panelId: number): PanelDeleteStart => 
    createAction(PANEL_ACTION_TYPES.DELETE_START, { panelId })
);

export const panelDeleteSuccess = withMatcher(
    (panel: Panel[]): PanelDeleteSuccess => 
    createAction(PANEL_ACTION_TYPES.DELETE_SUCCESS, panel)
);

export const panelDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(PANEL_ACTION_TYPES.DELETE_START, error)
);

export const panelFetchSingleStart = withMatcher(
    (panelId: number): PanelFetchSingleStart => 
    createAction(PANEL_ACTION_TYPES.FETCH_SINGLE_START, { panelId })
);

export const panelFetchSingleSuccess = withMatcher(
    (panels: Panel[]): PanelFetchSingleSuccess => 
    createAction(PANEL_ACTION_TYPES.FETCH_SINGLE_SUCCESS, panels)
);

export const panelFetchSingleFailed = withMatcher(
    (error: Error): PanelFetchSingleFailed => 
    createAction(PANEL_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const panelFetchAllUserStart = withMatcher(
    (userId: number): PanelFetchAllUserStart => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_USER_START, { userId })
);

export const panelFetchAllUserSuccess = withMatcher(
    (panels: Panel[]): PanelFetchAllUserSuccess => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_USER_SUCCESS, panels)
);

export const panelFetchAllUserFailed = withMatcher(
    (error: Error): PanelFetchAllUserFailed => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_USER_FAILED, error)
);

export const panelFetchAllStart = withMatcher(
    (): PanelFetchAllStart => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_START)
);

export const panelFetchAllSuccess = withMatcher(
    (panels: Panel[]): PanelFetchAllSuccess => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_SUCCESS, panels)
);

export const panelFetchAllFailed = withMatcher(
    (error: Error): PanelFetchAllFailed => 
    createAction(PANEL_ACTION_TYPES.FETCH_ALL_FAILED, error)
);


export const panelSetIdStart = withMatcher(
    (panelId: number): PanelSetIdStart => 
    createAction(PANEL_ACTION_TYPES.SET_ID_START, { panelId })
);

export const panelSetIdSuccess = withMatcher(
    (panelId: number): PanelSetIdSuccess => 
    createAction(PANEL_ACTION_TYPES.SET_ID_SUCCESS, { panelId })
);

export const panelSetIdFailed = withMatcher(
    (error: Error): PanelSetIdFailed => 
    createAction(PANEL_ACTION_TYPES.SET_ID_FAILED, error)
);
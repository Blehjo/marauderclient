import { all, call, put, takeLatest } from 'typed-redux-saga';

import { PANEL_ACTION_TYPES } from './panel.types';

import {
    PanelCreateStart,
    PanelDeleteStart,
    PanelFetchAllUserStart,
    PanelFetchSingleStart,
    PanelUpdateStart,
    panelCreateFailed,
    panelCreateSuccess,
    panelDeleteFailed,
    panelDeleteSuccess,
    panelFetchAllFailed,
    panelFetchAllSuccess,
    panelFetchAllUserFailed,
    panelFetchAllUserSuccess,
    panelFetchSingleFailed,
    panelFetchSingleSuccess,
    panelUpdateFailed,
    panelUpdateSuccess
} from './panel.action';

import {
    addPanel,
    deletePanel,
    editPanel,
    getAllPanels,
    getSinglePanel,
    getUserPanels
} from '../../utils/api/panel.api';

export function* createPanel({ payload: { title }}: PanelCreateStart ) {
    try {
        const panels = yield* call(
            addPanel,
            title
        ); 
        yield* put(panelCreateSuccess(panels));
    } catch (error) {
        yield* put(panelCreateFailed(error as Error));
    }
}

export function* updatePanel({ payload: { panelId, title }}: PanelUpdateStart) {
    try {
        const panel = yield* call(
            editPanel,
            panelId,
            title
        ); 
        yield* put(panelUpdateSuccess(panel));
    } catch (error) {
        yield* put(panelUpdateFailed(error as Error));
    }
}

export function* removePanel({ payload: { panelId }}: PanelDeleteStart) {
    try {
        const panels = yield* call(
            deletePanel,
            panelId
        ); 
        yield* put(panelDeleteSuccess(panels));
    } catch (error) {
        yield* put(panelDeleteFailed(error as Error));
    }
}

export function* fetchUserPanels({ payload: { userId }}: PanelFetchAllUserStart) {
    try {
        const panels  = yield* call(getUserPanels, userId);
        if (!panels) return;
        yield* put(panelFetchAllUserSuccess(panels));
    } catch (error) {
        yield* put(panelFetchAllUserFailed(error as Error));
    }
}

export function* fetchSinglePanel({ 
    payload: { panelId } }: PanelFetchSingleStart) {
    try {
        const panel = yield* call(
            getSinglePanel,
            panelId 
        );
        yield* put(panelFetchSingleSuccess(panel));
    } catch (error) {
        yield* put(panelFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPanels() {
    try {
        const panels = yield* call(getAllPanels);
        yield* put(panelFetchAllSuccess(panels));
    } catch (error) {
        yield* put(panelFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.CREATE_START, 
        createPanel
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.UPDATE_START, 
        updatePanel
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.DELETE_START, 
        removePanel
    );
}

export function* onFetchUserPanelsStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.FETCH_ALL_USER_START, 
        fetchUserPanels
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePanel
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        PANEL_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPanels
    );
}

export function* panelSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserPanelsStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
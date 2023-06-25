import { all, call, put, takeLatest } from 'typed-redux-saga';

import {
  getSingleAction,
  getActions,
  addAction,
  editAction,
  deleteAction
} from '../../utils/api/action.api';
import { ActionCreateStart, ActionDeleteStart, ActionFetchSingleStart, ActionUpdateStart, actionCreateFailed, actionCreateSuccess, actionDeleteFailed, actionDeleteStart, actionDeleteSuccess, actionFetchAllFailed, actionFetchAllStart, actionFetchAllSuccess, actionFetchSingleFailed, actionFetchSingleSuccess, actionUpdateFailed, actionUpdateSuccess } from './action.action';
import { ACTION_TYPES } from './action.types';

export function* createAction({ payload: { eventType, activity, pinId }}: ActionCreateStart ) {
    try {
        const actions = yield* call(
            addAction,
            eventType,
            activity,
            pinId
        ); 
        yield* put(actionCreateSuccess(actions));
    } catch (error) {
        yield* put(actionCreateFailed(error as Error));
    }
}

export function* updateAction({ payload: { actionId, eventType, activity, pinId }}: ActionUpdateStart) {
    try {
        const actions = yield* call(
            editAction,
            actionId,
            eventType,
            activity,
            pinId
        ); 
        yield* put(actionUpdateSuccess(actions));
    } catch (error) {
        yield* put(actionUpdateFailed(error as Error));
    }
}

export function* removeAction({ payload: { actionId }}: ActionDeleteStart) {
    try {
        const actions = yield* call(
            deleteAction,
            actionId
        ); 
        yield* put(actionDeleteSuccess(actions));
    } catch (error) {
        yield* put(actionDeleteFailed(error as Error));
    }
}

export function* fetchActions() {
    try {
        const actions  = yield* call(getActions);
        if (!actions) return;
        yield* put(actionFetchAllSuccess(actions));
    } catch (error) {
        yield* put(actionFetchAllFailed(error as Error));
    }
}

export function* fetchSingleAction({ 
    payload: { actionId } }: ActionFetchSingleStart) {
    try {
        const action = yield* call(
            getSingleAction,
            actionId 
        );
        yield* put(actionFetchSingleSuccess(action));
    } catch (error) {
        yield* put(actionFetchSingleFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        ACTION_TYPES.CREATE_START, 
        createAction
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        ACTION_TYPES.UPDATE_START, 
        updateAction
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        ACTION_TYPES.DELETE_START, 
        removeAction
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleAction
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        ACTION_TYPES.FETCH_ALL_START,
        fetchActions
    );
}

export function* actionSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
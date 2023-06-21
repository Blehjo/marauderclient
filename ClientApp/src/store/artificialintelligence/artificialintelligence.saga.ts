import { takeLatest, put, all, call } from 'typed-redux-saga';

import { ArtificialIntelligence, ARTIFICIALINTELLIGENCE_ACTION_TYPES } from './artificialintelligence.types';

import {
    artificialIntelligenceCreateSuccess,
    artificialIntelligenceCreateFailed,
    artificialIntelligenceUpdateSuccess,
    artificialIntelligenceUpdateFailed,
    artificialIntelligenceDeleteSuccess,
    artificialIntelligenceDeleteFailed,
    artificialIntelligenceFetchSingleSuccess,
    artificialIntelligenceFetchSingleFailed,
    artificialIntelligenceFetchAllSuccess,
    artificialIntelligenceFetchAllFailed,
    ArtificialIntelligenceCreateStart,
    ArtificialIntelligenceUpdateStart,
    ArtificialIntelligenceDeleteStart,
    ArtificialIntelligenceFetchSingleStart,
    ArtificialIntelligenceFetchAllStart,
    ArtificialIntelligenceFetchUsersStart,
    artificialIntelligenceFetchOtherUsersSuccess,
    artificialIntelligenceFetchOtherUsersFailed,
    ArtificialIntelligenceFetchOtherUsersStart,
    artificialIntelligenceFetchUsersStart,
    artificialIntelligenceFetchUsersSuccess,
    artificialIntelligenceFetchUsersFailed
} from './artificialintelligence.action';

import { 
    getSingleArtificialIntelligence,
    getUsersArtificialIntelligences,
    getAllArtificialIntelligences,
    addArtificialIntelligence,
    editArtificialIntelligence,
    deleteArtificialIntelligence,
    getOtherUserArtificialIntelligences
} from '../../utils/api/artificialintelligence.api';

export function* createArtificialIntelligence({ payload: { name, role, imageFile }}: ArtificialIntelligenceCreateStart ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('imageFile', imageFile);
    try {
        const artificialIntelligence = yield* call(
            addArtificialIntelligence,
            formData
        ); 
        yield* put(artificialIntelligenceCreateSuccess(artificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceCreateFailed(error as Error));
    }
}

export function* updateChat({ payload: { artificialIntelligenceId, name, role, imageFile }}: ArtificialIntelligenceUpdateStart) {
    try {
        const artificialIntelligence = yield* call(
            editArtificialIntelligence,
            artificialIntelligenceId,
            name,
            role,
            imageFile
        ); 
        yield* put(artificialIntelligenceUpdateSuccess(artificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceCreateFailed(error as Error));
    }
}

export function* removeChat({ payload: { artificialIntelligenceId }}: ArtificialIntelligenceDeleteStart) {
    try {
        const artificialIntelligences = yield* call(
            deleteArtificialIntelligence,
            artificialIntelligenceId
        ); 
        yield* put(artificialIntelligenceDeleteSuccess(artificialIntelligences));
    } catch (error) {
        yield* put(artificialIntelligenceDeleteFailed(error as Error));
    }
}

export function* fetchUserArtificialIntelligences() {
    try {
        const artificialIntelligence = yield* call(getUsersArtificialIntelligences);
        if (!artificialIntelligence) return;
        yield* put(artificialIntelligenceFetchUsersSuccess(artificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceFetchUsersFailed(error as Error));
    }
}

export function* fetchOtherUsersArtificialIntelligences({ payload: { userId } }: ArtificialIntelligenceFetchOtherUsersStart) {
    try {
        const artificialIntelligences = yield* call(
            getOtherUserArtificialIntelligences,
            userId
        );
        if (!artificialIntelligences) return;
        yield* put(artificialIntelligenceFetchOtherUsersSuccess(artificialIntelligences));
    } catch (error) {
        yield* put(artificialIntelligenceFetchOtherUsersFailed(error as Error));
    }
}

export function* fetchSingleChatAsync({ 
    payload: { artificialIntelligenceId } }: ArtificialIntelligenceFetchSingleStart) {
    try {
        const artificialIntelligenceSnapshot = yield* call(
            getSingleArtificialIntelligence,
            artificialIntelligenceId 
        );
        yield* put(artificialIntelligenceFetchSingleSuccess(artificialIntelligenceSnapshot as ArtificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChatsAsync() {
    try {
        const artificialIntelligences = yield* call(getAllArtificialIntelligences);
        yield* put(artificialIntelligenceFetchAllSuccess(artificialIntelligences));
    } catch (error) {
        yield* put(artificialIntelligenceFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_START, 
        createArtificialIntelligence
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_START, 
        updateChat
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_START, 
        removeChat
    );
}

export function* onFetchUserChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START, 
        fetchUserArtificialIntelligences
    );
}

export function* onFetchOtherUserChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, 
        fetchOtherUsersArtificialIntelligences
    );
}

export function* onFetchSingleChatStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChatAsync
    );
}
  
export function* onFetchChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChatsAsync
    );
}

export function* artificialIntelligenceSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserChatsStart),
        call(onFetchOtherUserChatsStart),
        call(onFetchSingleChatStart),
        call(onFetchChatsStart)
    ]);
}
import { all, call, put, takeLatest } from 'typed-redux-saga';

import { MEMBER_ACTION_TYPES } from './member.types';

import {
    MoonCreateStart,
    MoonDeleteStart,
    MoonFetchOtherUserMoonsStart,
    MoonFetchSingleStart,
    MoonFetchUserMoonsStart,
    MoonUpdateStart,
    moonCreateFailed,
    moonCreateSuccess,
    moonDeleteFailed,
    moonDeleteSuccess,
    moonFetchAllFailed,
    moonFetchAllSuccess,
    moonFetchOtherUserMoonsFailed,
    moonFetchOtherUserMoonsSuccess,
    moonFetchSingleFailed,
    moonFetchSingleSuccess,
    moonFetchUserMoonsFailed,
    moonFetchUserMoonsSuccess,
    moonUpdateSuccess
} from './member.action';

import {
    addMoon,
    deleteMoon,
    editMoon,
    getMoons,
    getSingleMoon,
    getUserMoons,
    getUsersMoons
} from '../../utils/api/moon.api';

export function* createMoon({ payload: { 
    moonName,
    moonMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    planetId,
    imageLink,
    imageFile
}}: MoonCreateStart ) {
    const formData = new FormData();
    formData.append('moonName', moonName);
    formData.append('moonMass', moonMass);
    formData.append('perihelion', perihelion);
    formData.append('aphelion', aphelion);
    formData.append('gravity', gravity);
    formData.append('temperature', temperature);
    formData.append('imageLink', imageLink);
    formData.append('imageFile', imageFile);
    try {
        const moon = yield* call(
            addMoon,
            planetId!,
            formData
        ); 
        yield* put(moonCreateSuccess(moon));
    } catch (error) {
        yield* put(moonCreateFailed(error as Error));
    }
}

export function* updateMoon({ payload: { 
    moonId,
    moonName,
    moonMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    planetId,
    imageLink,
    imageFile 
}}: MoonUpdateStart) {
    try {
        const moon = yield* call(
            editMoon,
            moonId,
            moonName,
            moonMass,
            perihelion,
            aphelion,
            gravity,
            temperature,
            planetId,
            imageLink,
            imageFile
        ); 
        yield* put(moonUpdateSuccess(moon));
    } catch (error) {
        yield* put(moonCreateFailed(error as Error));
    }
}


export function* removeMoon({ payload: { moonId }}: MoonDeleteStart) {
    try {
        const moons = yield* call(
            deleteMoon,
            moonId
        ); 
        yield* put(moonDeleteSuccess(moons));
    } catch (error) {
        yield* put(moonDeleteFailed(error as Error));
    }
}

export function* fetchUserMoons() {
    try {
        const moon = yield* call(getUserMoons);
        if (!moon) return;
        yield* put(moonFetchUserMoonsSuccess(moon));
    } catch (error) {
        yield* put(moonFetchUserMoonsFailed(error as Error));
    }
}

export function* fetchOtherUserMoons({ payload: { userId }}: MoonFetchOtherUserMoonsStart) {
    try {
        const moon = yield* call(getUsersMoons, userId);
        if (!moon) return;
        yield* put(moonFetchOtherUserMoonsSuccess(moon));
    } catch (error) {
        yield* put(moonFetchOtherUserMoonsFailed(error as Error));
    }
}

export function* fetchOtherUsersMoons({}: MoonFetchUserMoonsStart) {
    try {
        const Moons = yield* call(
            getUserMoons,
        );
        if (!Moons) return;
        yield* call(moonFetchAllSuccess, Moons);
    } catch (error) {
        yield* put(moonFetchAllFailed(error as Error));
    }
}

export function* fetchSingleMoonAsync({ 
    payload: { moonId } }: MoonFetchSingleStart) {
    try {
        const MoonSnapshot = yield* call(
            getSingleMoon,
            moonId 
        );
        yield* put(moonFetchSingleSuccess(MoonSnapshot));
    } catch (error) {
        yield* put(moonFetchSingleFailed(error as Error));
    }
}

export function* fetchAllMoonsAsync() {
    try {
        const Moons = yield* call(getMoons);
        yield* put(moonFetchAllSuccess(Moons));
    } catch (error) {
        yield* put(moonFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.CREATE_START, 
        createMoon
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.UPDATE_START, 
        updateMoon
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.DELETE_START, 
        removeMoon
    );
}

export function* onFetchUserMoonsStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_USER_MOONS_START, 
        fetchUserMoons
    );
}

export function* onFetchOtherUserMoonsStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_OTHER_USER_MOONS_START, 
        fetchOtherUserMoons
    );
}

export function* onFetchSingleMoonStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleMoonAsync
    );
}
  
export function* onFetchMoonsStart() {
    yield* takeLatest(
        MEMBER_ACTION_TYPES.FETCH_ALL_START,
        fetchAllMoonsAsync
    );
}

export function* moonSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserMoonsStart),
        call(onFetchOtherUserMoonsStart),
        call(onFetchSingleMoonStart),
        call(onFetchMoonsStart)
    ]);
}
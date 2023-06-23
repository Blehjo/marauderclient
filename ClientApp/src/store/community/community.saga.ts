import { all, call, put, takeLatest } from 'typed-redux-saga';

import { PLANET_ACTION_TYPES, Planet } from './community.types';

import {
    PlanetCreateStart,
    PlanetDeleteStart,
    PlanetFetchOtherUserPlanetsStart,
    PlanetFetchSingleStart,
    PlanetUpdateStart,
    planetCreateFailed,
    planetCreateSuccess,
    planetDeleteFailed,
    planetDeleteSuccess,
    planetFetchAllFailed,
    planetFetchAllSuccess,
    planetFetchOtherUserPlanetsFailed,
    planetFetchOtherUserPlanetsSuccess,
    planetFetchSingleFailed,
    planetFetchSingleSuccess,
    planetFetchUserPlanetsFailed,
    planetFetchUserPlanetsSuccess,
    planetUpdateFailed,
    planetUpdateSuccess
} from './community.action';

import {
    addPlanet,
    deletePlanet,
    editPlanet,
    getPlanets,
    getSinglePlanet,
    getUserPlanets,
    getUsersPlanets
} from '../../utils/api/planet.api';

export function* createPlanet({ payload: { 
    planetName,
    planetMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    imageLink,
    imageFile
}}: PlanetCreateStart) {
    const formData = new FormData();
    formData.append("planetName", planetName);
    formData.append("planetMass", planetMass);
    formData.append("perihelion", perihelion);
    formData.append("aphelion", aphelion);
    formData.append("gravity", gravity);
    formData.append("temperature", temperature);
    formData.append("imageLink", imageLink);
    formData.append("imageFile", imageFile);
    try {
        const planets = yield* call(
            addPlanet,
            formData
        ); 
        yield* put(planetCreateSuccess(planets));
    } catch (error) {
        yield* put(planetCreateFailed(error as Error));
    }
}

export function* updatePlanet({ payload: { 
    planetId,
    planetName,
    planetMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    imageLink,
    imageFile
}}: PlanetUpdateStart) {
    const formData = new FormData();
    formData.append("planetName", planetName);
    formData.append("planetMass", planetMass);
    formData.append("perihelion", perihelion);
    formData.append("aphelion", aphelion);
    formData.append("gravity", gravity);
    formData.append("temperature", temperature);
    formData.append("imageLink", imageLink);
    formData.append("imageFile", imageFile);
    try {
        const planet = yield* call(
            editPlanet,
            planetId,
            formData
        ); 
        yield* put(planetUpdateSuccess(planet));
    } catch (error) {
        yield* put(planetUpdateFailed(error as Error));
    }
}


export function* removePlanet({ payload: { planetId }}: PlanetDeleteStart) {
    try {
        const planets = yield* call(
            deletePlanet,
            planetId
        ); 
        yield* put(planetDeleteSuccess(planets));
    } catch (error) {
        yield* put(planetDeleteFailed(error as Error));
    }
}

export function* fetchUserPlanets() {
    try {
        const planets = yield* call(getUsersPlanets);
        if (!planets) return;
        yield* put(planetFetchUserPlanetsSuccess(planets));
    } catch (error) {
        yield* put(planetFetchUserPlanetsFailed(error as Error));
    }
}

export function* fetchOtherUsersPlanets({ payload: { userId } }: PlanetFetchOtherUserPlanetsStart) {
    try {
        const planets = yield* call(
            getUserPlanets,
            userId
        );
        if (!planets) return;
        yield* put(planetFetchOtherUserPlanetsSuccess(planets));
    } catch (error) {
        yield* put(planetFetchOtherUserPlanetsFailed(error as Error));
    }
}

export function* fetchSinglePlanetAsync({ 
    payload: { planetId } }: PlanetFetchSingleStart) {
    try {
        const planetSnapshot = yield* call(
            getSinglePlanet,
            planetId 
        );
        yield* put(planetFetchSingleSuccess(planetSnapshot as Planet));
    } catch (error) {
        yield* put(planetFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPlanetsAsync() {
    try {
        const planets = yield* call(getPlanets);
        yield* put(planetFetchAllSuccess(planets));
    } catch (error) {
        yield* put(planetFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.CREATE_START, 
        createPlanet
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.UPDATE_START, 
        updatePlanet
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.DELETE_START, 
        removePlanet
    );
}

export function* onFetchUserPlanetsStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START, 
        fetchUserPlanets
    );
}

export function* onFetchOtherUserPlanetsStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_OTHER_USER_PLANETS_START, 
        fetchOtherUsersPlanets
    );
}

export function* onFetchSinglePlanetStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePlanetAsync
    );
}
  
export function* onFetchPlanetsStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPlanetsAsync
    );
}

export function* planetSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserPlanetsStart),
        call(onFetchOtherUserPlanetsStart),
        call(onFetchSinglePlanetStart),
        call(onFetchPlanetsStart)
    ]);
}
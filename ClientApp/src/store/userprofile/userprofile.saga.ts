import { all, call, put, takeLatest } from 'typed-redux-saga';

import { USERPROFILE_ACTION_TYPES } from './userprofile.types';

import {
    UserprofileCreateStart,
    UserprofileDeleteStart,
    UserprofileFetchSingleStart,
    UserprofileUpdateStart,
    userprofileCreateFailed,
    userprofileCreateSuccess,
    userprofileDeleteFailed,
    userprofileDeleteSuccess,
    userprofileFetchAllFailed,
    userprofileFetchAllSuccess,
    userprofileFetchSingleFailed,
    userprofileFetchSingleSuccess,
    userprofileUpdateSuccess
} from './userprofile.action';

import {
    addUser,
    deleteUser,
    editUser,
    getSingleUser,
    getUsers
} from '../../utils/api/user.api';

export function* createUser({ payload: { 
    username,
    firstName,
    lastName,
    dateOfBirth,
    emailAddress,
    password,
    about,
    imageLink 
}}: UserprofileCreateStart ) {
    try {
        const user = yield* call(
            addUser,
            username,
            firstName,
            lastName,
            dateOfBirth,
            emailAddress,
            password,
            about,
            imageLink
        ); 
        yield* put(userprofileCreateSuccess(user));
    } catch (error) {
        yield* put(userprofileCreateFailed(error as Error));
    }
}

export function* updateUser({ payload: { 
    userId,
    username,
    firstName,
    lastName,
    dateOfBirth,
    emailAddress,
    password,
    about,
    imageLink, 
    imageFile
}}: UserprofileUpdateStart) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('emailAddress', emailAddress);
    formData.append('password', password);
    formData.append('about', about);
    formData.append('imageLink', imageLink);
    formData.append('imageFile', imageFile);
    try {
        const user = yield* call(
            editUser,
            userId,
            formData
        ); 
        yield* put(userprofileUpdateSuccess(user));
    } catch (error) {
        yield* put(userprofileCreateFailed(error as Error));
    }
}

export function* removeUser({ payload: { userId }}: UserprofileDeleteStart) {
    try {
        const users = yield* call(
            deleteUser,
            userId
        ); 
        yield* put(userprofileDeleteSuccess(users));
    } catch (error) {
        yield* put(userprofileDeleteFailed(error as Error));
    }
}

export function* fetchUserprofiles() {
    try {
        const users = yield* call(
            getUsers
        );
        if (!users) return;
        yield* put(userprofileFetchAllSuccess(users));
    } catch (error) {
        yield* put(userprofileFetchAllFailed(error as Error));
    }
}

export function* fetchSingleUserprofileAsync({ 
    payload: { userId } }: UserprofileFetchSingleStart) {
    try {
        const userSnapshot = yield* call(
            getSingleUser,
            userId 
        );
        yield* put(userprofileFetchSingleSuccess(userSnapshot));
    } catch (error) {
        yield* put(userprofileFetchSingleFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        USERPROFILE_ACTION_TYPES.CREATE_START, 
        createUser
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        USERPROFILE_ACTION_TYPES.UPDATE_START, 
        updateUser
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        USERPROFILE_ACTION_TYPES.DELETE_START, 
        removeUser
    );
}

export function* onFetchSingleUserprofileStart() {
    yield* takeLatest(
        USERPROFILE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleUserprofileAsync
    );
}

export function* onFetchUserprofilesStart() {
    yield* takeLatest(
        USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_START, 
        fetchUserprofiles
    );
}

export function* userprofileSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleUserprofileStart),
        call(onFetchUserprofilesStart)
    ]);
}
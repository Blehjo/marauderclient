import { takeLatest, put, all, call } from 'typed-redux-saga';

import { USER_ACTION_TYPES } from './user.types';

import { 
    signInSuccess, 
    signInFailed, 
    signUpSuccess, 
    signUpFailed, 
    signOutSuccess, 
    signOutFailed,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess,
    setCurrentUser,
    CheckUserSession
} from './user.action';

import { 
    getUser, 
    login, 
    signUpUser, 
    signOutUser
} from '../../utils/api/userdocuments';

export function* getSnapshotFromUserAuth() {
    try {
      const userSnapshot = yield* call(
        getUser
      );
      yield* put(setCurrentUser(userSnapshot));
    } catch (error) {
      yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({ payload: { username, password }}: EmailSignInStart) {
    try {
        const user = yield* call(
            login,
            username,
            password
        );
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated({}: CheckUserSession) {
   try {
       const userAuth = yield* call(getUser);
       if (!userAuth) return;
       yield* put(setCurrentUser(userAuth));
   } catch (error) {
       yield* put(signInFailed(error as Error));
   }
}

export function* signUp({ payload: {
    username,
    firstName,
    lastName,
    emailAddress,
    password,
    about,
    imageLink,
    imageFile
}}: SignUpStart) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('emailAddress', emailAddress);
    formData.append('password', password);
    formData.append('about', about);
    formData.append('imageLink', imageLink);
    formData.append('imageFile', imageFile);
   try {
        const userCredential = yield* call(
            signUpUser,
            formData
        );
        yield* put(signUpSuccess(userCredential));
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: user }: SignUpSuccess) {
   yield* call(getSnapshotFromUserAuth, user );
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onCheckUserSession() {
   yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
   yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
   yield* all([
       call(onCheckUserSession),
       call(onEmailSignInStart),
       call(onSignUpStart),
       call(onSignUpSuccess),
       call(onSignOutStart),
   ]);
}
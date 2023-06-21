import { USER_ACTION_TYPES, User } from './user.types';

import {
    createAction,
    withMatcher,
    Action,
    ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type SetCurrentUser = ActionWithPayload<
    USER_ACTION_TYPES.SET_CURRENT_USER, User
>;

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START, { 
        username: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        password: string;
        about: string;
        imageLink: string; 
        imageFile: File;
    }
>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { username: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  User
>;

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  User
>;

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export const setCurrentUser = withMatcher(
    (user: User): SetCurrentUser =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
    (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const emailSignInStart = withMatcher(
    (username: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { username, password })
);

export const signInSuccess = withMatcher(
    (user: User): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
    (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);
 
export const signUpStart = withMatcher(
    (   username: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        emailAddress: string,
        password: string,
        about: string,
        imageLink: string, 
        imageFile: File,
): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
        username,
        firstName,
        lastName,
        dateOfBirth,
        emailAddress,
        password,
        about,
        imageLink,
        imageFile
    }
));

export const signUpSuccess = withMatcher(
    (user: User): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, user)
);

export const signUpFailed = withMatcher(
    (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
    (): SignOutStart =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
    (): SignOutSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
    (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
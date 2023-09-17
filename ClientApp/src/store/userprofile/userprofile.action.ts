import { USERPROFILE_ACTION_TYPES } from './userprofile.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { User } from '../user/user.types';

export type UserprofileCreateStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_START, {
        username: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        emailAddress: string,
        password: string,
        about: string,
        imageLink: string 
    }
>;

export type UserprofileCreateSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_SUCCESS, 
    User
>;

export type UserprofileCreateFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type UserprofileUpdateStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_START, {
        userId: string,
        username: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        emailAddress: string,
        password: string,
        about: string,
        imageLink: string,
        imageFile: File
    }
>;

export type UserprofileUpdateSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_SUCCESS, 
    User
>;

export type UserprofileUpdateFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type UserprofileDeleteStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_START,
    { userId: string }
>;

export type UserprofileDeleteSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_SUCCESS, 
    User
>;

export type UserprofileDeleteteFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type UserprofileFetchSingleStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_START,
    { userId: string | undefined }
>;

export type UserprofileFetchSingleSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    User
>;

export type UserprofileFetchSingleFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type UserprofileFetchAllStart = Action<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_START
>;

export type UserprofileFetchAllSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    User[]
>;

export type UserprofileFetchAllFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const userprofileCreateStart = withMatcher(
    (
        username: string, 
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        emailAddress: string,
        password: string,
        about: string,
        imageLink: string
    ): UserprofileCreateStart => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_START, {
        username,
        firstName,
        lastName,
        dateOfBirth,
        emailAddress,
        password,
        about,
        imageLink
    })
);

export const userprofileCreateSuccess = withMatcher(
    (userprofile: User): UserprofileCreateSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_SUCCESS, userprofile)
);

export const userprofileCreateFailed = withMatcher(
    (error: Error) => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_START, error)
);
 
export const userprofileUpdateStart = withMatcher(
    (
        userId: string,
        username: string, 
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        emailAddress: string,
        password: string,
        about: string,
        imageLink: string,
        imageFile: File
    ): UserprofileUpdateStart => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_START, {
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
    })
);

export const userprofileUpdateSuccess = withMatcher(
    (userprofile: User): UserprofileUpdateSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_SUCCESS, userprofile)
);

export const userprofileUpdateFailed = withMatcher(
    (error: Error): UserprofileUpdateFailed => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const userprofileDeleteStart = withMatcher(
    (userId: string): UserprofileDeleteStart => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_START, { userId })
);

export const userprofileDeleteSuccess = withMatcher(
    (userprofile: User): UserprofileDeleteSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_SUCCESS, userprofile)
);

export const userprofileDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_START, error)
);

export const userprofileFetchSingleStart = withMatcher(
    (userId: string | undefined): UserprofileFetchSingleStart => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_START, { userId })
);

export const userprofileFetchSingleSuccess = withMatcher(
    (userprofile: User): UserprofileFetchSingleSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, userprofile)
);

export const userprofileFetchSingleFailed = withMatcher(
    (error: Error): UserprofileFetchSingleFailed => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const userprofileFetchAllStart = withMatcher(
    (userprofile: User): UserprofileFetchAllStart => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_START, userprofile)
);

export const userprofileFetchAllSuccess = withMatcher(
    (userprofiles: User[]): UserprofileFetchAllSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, userprofiles)
);

export const userprofileFetchAllFailed = withMatcher(
    (error: Error): UserprofileFetchAllFailed => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
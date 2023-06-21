import { INTERFACE_ACTION_TYPES, Interface } from './interface.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type InterfaceCreateStart = ActionWithPayload<
    INTERFACE_ACTION_TYPES.CREATE_START, { name: string, role: string, imageFile: File }
>;

export type InterfaceCreateSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.CREATE_SUCCESS, 
    Interface[]
>;

export type InterfaceCreateFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type InterfaceUpdateStart = ActionWithPayload<
    INTERFACE_ACTION_TYPES.UPDATE_START, { InterfaceId: number, name: string, role: string, imageFile: File }
>;

export type InterfaceUpdateSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.UPDATE_SUCCESS, 
    Interface[]
>;

export type InterfaceUpdateFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type InterfaceDeleteStart = ActionWithPayload<
    INTERFACE_ACTION_TYPES.DELETE_START, { InterfaceId: number }
>;

export type InterfaceDeleteSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.DELETE_SUCCESS, 
    Interface[]
>;

export type InterfaceDeleteteFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type InterfaceFetchSingleStart = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_SINGLE_START, { InterfaceId: number }
>;

export type InterfaceFetchSingleSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Interface
>;

export type InterfaceFetchSingleFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type InterfaceFetchUsersStart = Action<
    INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_START
>;

export type InterfaceFetchUsersSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_SUCCESS, 
    Interface[]
>;

export type InterfaceFetchUsersFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_FAILED,
    Error
>;

export type InterfaceFetchOtherUsersStart = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_START, { userId: number }
>;

export type InterfaceFetchOtherUsersSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_SUCCESS, 
    Interface[]
>;

export type InterfaceFetchOtherUsersFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_FAILED,
    Error
>;

export type InterfaceFetchAllStart = Action<
    INTERFACE_ACTION_TYPES.FETCH_ALL_START
>;

export type InterfaceFetchAllSuccess = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Interface[]
>;

export type InterfaceFetchAllFailed = ActionWithPayload<
    INTERFACE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export type ToggleUtils = Action<
    INTERFACE_ACTION_TYPES.TOGGLE_UTILS
>;

export const interfaceCreateStart = withMatcher(
    (name: string, role: string, imageFile: File): InterfaceCreateStart => 
    createAction(INTERFACE_ACTION_TYPES.CREATE_START, { name, role, imageFile})
);

export const interfaceCreateSuccess = withMatcher(
    (Interface: Interface[]): InterfaceCreateSuccess => 
    createAction(INTERFACE_ACTION_TYPES.CREATE_SUCCESS, Interface)
);

export const interfaceCreateFailed = withMatcher(
    (error: Error) => 
    createAction(INTERFACE_ACTION_TYPES.CREATE_START, error)
);
 
export const interfaceUpdateStart = withMatcher(
    (InterfaceId: number, name: string, role: string, imageFile: File): InterfaceUpdateStart => 
    createAction(INTERFACE_ACTION_TYPES.UPDATE_START, { InterfaceId, name, role, imageFile})
);

export const interfaceUpdateSuccess = withMatcher(
    (Interface: Interface[]): InterfaceUpdateSuccess => 
    createAction(INTERFACE_ACTION_TYPES.UPDATE_SUCCESS, Interface)
);

export const interfaceUpdateFailed = withMatcher(
    (error: Error): InterfaceUpdateFailed => 
    createAction(INTERFACE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const interfaceDeleteStart = withMatcher(
    (InterfaceId: number): InterfaceDeleteStart => 
    createAction(INTERFACE_ACTION_TYPES.DELETE_START, { InterfaceId })
);

export const interfaceDeleteSuccess = withMatcher(
    (Interface: Interface[]): InterfaceDeleteSuccess => 
    createAction(INTERFACE_ACTION_TYPES.DELETE_SUCCESS, Interface)
);

export const interfaceDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(INTERFACE_ACTION_TYPES.DELETE_START, error)
);

export const interfaceFetchSingleStart = withMatcher(
    (InterfaceId: number): InterfaceFetchSingleStart => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_SINGLE_START, { InterfaceId })
);

export const interfaceFetchSingleSuccess = withMatcher(
    (Interface: Interface): InterfaceFetchSingleSuccess => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Interface)
);

export const interfaceFetchSingleFailed = withMatcher(
    (error: Error): InterfaceFetchSingleFailed => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const interfaceFetchUsersStart = withMatcher(
    (): InterfaceFetchUsersStart => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_START)
);

export const interfaceFetchUsersSuccess = withMatcher(
    (Interface: Interface[]): InterfaceFetchUsersSuccess => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_SUCCESS, Interface)
);

export const interfaceFetchUsersFailed = withMatcher(
    (error: Error): InterfaceFetchUsersFailed => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_USER_INTERFACE_FAILED, error)
);

export const interfaceFetchOtherUsersStart = withMatcher(
    (userId: number): InterfaceFetchOtherUsersStart => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_START, { userId })
);

export const interfaceFetchOtherUsersSuccess = withMatcher(
    (Interface: Interface[]): InterfaceFetchOtherUsersSuccess => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_SUCCESS, Interface)
);

export const interfaceFetchOtherUsersFailed = withMatcher(
    (error: Error): InterfaceFetchOtherUsersFailed => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_OTHER_USER_INTERFACE_FAILED, error)
);

export const interfaceFetchAllStart = withMatcher(
    (): InterfaceFetchAllStart => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_ALL_START)
);

export const interfaceFetchAllSuccess = withMatcher(
    (Interface: Interface[]): InterfaceFetchAllSuccess => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_ALL_SUCCESS, Interface)
);

export const interfaceFetchAllFailed = withMatcher(
    (error: Error): InterfaceFetchAllFailed => 
    createAction(INTERFACE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);

export const toggleUtils = withMatcher(
    (): ToggleUtils => 
    createAction(INTERFACE_ACTION_TYPES.TOGGLE_UTILS)
);
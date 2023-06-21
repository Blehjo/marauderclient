import { AnyAction } from 'redux';

import { Interface } from './interface.types';

import {
    interfaceCreateStart,
    interfaceCreateSuccess,
    interfaceCreateFailed,
    interfaceUpdateStart,
    interfaceUpdateSuccess,
    interfaceUpdateFailed,
    interfaceDeleteStart,
    interfaceDeleteSuccess,
    interfaceDeleteFailed,
    interfaceFetchSingleStart,
    interfaceFetchSingleSuccess,
    interfaceFetchSingleFailed,
    interfaceFetchAllStart,
    interfaceFetchAllSuccess,
    interfaceFetchAllFailed,
    interfaceFetchUsersStart,
    interfaceFetchOtherUsersStart,
    interfaceFetchUsersSuccess,
    toggleUtils,
} from './interface.action';

export type InterfaceState = {
    readonly utilsOpen: boolean;
}

const INITIAL_STATE: InterfaceState = {
    utilsOpen: false
};

export const interfaceReducer = (
    state = INITIAL_STATE, action: AnyAction
): InterfaceState => {
    if (
        toggleUtils.match(action)
    ) {
        return { ...state, utilsOpen: !state.utilsOpen }
    }
  
    return state;
};
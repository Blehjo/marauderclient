import { AnyAction } from 'redux';

import { setIsProfileOpen } from './profile.action';

export type ProfileState = {
  readonly isProfileOpen: boolean;
};

export const PROFILE_INITIAL_STATE: ProfileState = {
  isProfileOpen: false
};

export const profileReducer = (
  state = PROFILE_INITIAL_STATE,
  action: AnyAction
): ProfileState => {
  if (setIsProfileOpen.match(action)) {
    return {
      ...state,
      isProfileOpen: action.payload,
    };
  }

  return state;
};
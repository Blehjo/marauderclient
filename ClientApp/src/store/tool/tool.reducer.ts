import { AnyAction } from 'redux';

import { setIsToolOpen } from './tool.action';

export type ToolState = {
  readonly isToolOpen: boolean;
};

export const INITIAL_STATE: ToolState = {
  isToolOpen: false
};

export const toolReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): ToolState => {
  if (setIsToolOpen.match(action)) {
    return {
      ...state,
      isToolOpen: action.payload,
    };
  }

  return state;
};
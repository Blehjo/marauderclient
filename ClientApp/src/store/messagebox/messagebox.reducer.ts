import { AnyAction } from 'redux';

import {
    setIsArtificialIntelligenceOpen,
    setIsMaraudersOpen,
    setIsMessagesOpen,
    setIsMoonsOpen,
    setIsPlanetsOpen,
    setIsPostOpen,
    setIsSolarSystemOpen,
    setIsDevicesOpen
} from './messagebox.action';

export type MessageBoxState = {
  readonly isArtificialIntelligenceOpen: boolean;
  readonly isDevicesOpen: boolean;
  readonly isPostOpen: boolean;
  readonly isSolarSystemOpen: boolean;
  readonly isPlanetsOpen: boolean;
  readonly isMoonsOpen: boolean;
  readonly isMaraudersOpen: boolean;
  readonly isMessagesOpen: boolean;
};

const INITIAL_STATE: MessageBoxState = {
    isArtificialIntelligenceOpen: false,
    isDevicesOpen: false,
    isPostOpen: false,
    isSolarSystemOpen: false,
    isPlanetsOpen: false,
    isMoonsOpen: false,
    isMaraudersOpen: true,
    isMessagesOpen: false
};

export const messageboxReducer = (
    state = INITIAL_STATE,
    action: AnyAction
  ): MessageBoxState => {
    if (setIsArtificialIntelligenceOpen.match(action)) {
      return {
        ...state,
        isArtificialIntelligenceOpen: action.payload,
      };
    }
    if (setIsDevicesOpen.match(action)) {
      return {
        ...state,
        isDevicesOpen: action.payload,
      };
    }
    if (setIsPostOpen.match(action)) {
      return {
        ...state,
        isPostOpen: action.payload,
      };
    }
    if (setIsSolarSystemOpen.match(action)) {
      return {
        ...state,
        isSolarSystemOpen: action.payload,
      };
    }
    if (setIsPlanetsOpen.match(action)) {
      return {
        ...state,
        isPlanetsOpen: action.payload,
      };
    }
    if (setIsMoonsOpen.match(action)) {
      return {
        ...state,
        isMoonsOpen: action.payload,
      };
    }
    if (setIsMaraudersOpen.match(action)) {
      return {
        ...state,
        isMaraudersOpen: action.payload,
      };
    }
    if (setIsMessagesOpen.match(action)) {
      return {
        ...state,
        isMessagesOpen: action.payload,
      };
    }
  
    return state;
};
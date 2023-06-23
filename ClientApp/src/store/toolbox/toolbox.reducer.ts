import { AnyAction } from 'redux';

import {
    setIsArtificialIntelligenceOpen,
    setIsMaraudersOpen,
    setIsMessagesOpen,
    setIsMoonsOpen,
    setIsPlanetsOpen,
    setIsPostOpen,
    setIsSolarSystemOpen,
    setIsVitalsOpen
} from './toolbox.action';

export type ToolboxState = {
  readonly isArtificialIntelligenceOpen: boolean;
  readonly isVitalsOpen: boolean;
  readonly isPostOpen: boolean;
  readonly isSolarSystemOpen: boolean;
  readonly isPlanetsOpen: boolean;
  readonly isMoonsOpen: boolean;
  readonly IsMaraudersOpen: boolean;
  readonly isMessagesOpen: boolean;
};

const INITIAL_STATE: ToolboxState = {
    isArtificialIntelligenceOpen: false,
    isVitalsOpen: false,
    isPostOpen: false,
    isSolarSystemOpen: false,
    isPlanetsOpen: false,
    isMoonsOpen: false,
    IsMaraudersOpen: false,
    isMessagesOpen: false
};

export const toolboxReducer = (
    state = INITIAL_STATE,
    action: AnyAction
  ): ToolboxState => {
    if (setIsArtificialIntelligenceOpen.match(action)) {
      return {
        ...state,
        isArtificialIntelligenceOpen: action.payload,
      };
    }
    if (setIsVitalsOpen.match(action)) {
      return {
        ...state,
        isVitalsOpen: action.payload,
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
        IsMaraudersOpen: action.payload,
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
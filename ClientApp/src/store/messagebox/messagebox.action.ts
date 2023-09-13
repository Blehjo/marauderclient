import {
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/reducer/reducer.utils';

import { MESSAGEBOX_ACTION_TYPES } from "./messagebox.types";

export type SetIsArtificialIntelligenceOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_ARTIFICIALINTELLIGENCE_OPEN,
  boolean
>;

export type SetIsVitalsOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_VITALS_OPEN,
  boolean
>;

export type SetIsPostOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_POST_OPEN,
  boolean
>;

export type SetIsSolarSystemOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_SOLARSYSTEM_OPEN,
  boolean
>;

export type SetIsPlanetsOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_PLANETS_OPEN,
  boolean
>;

export type SetIsMoonsOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_MOONS_OPEN,
  boolean
>;

export type SetIsMaraudersOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_MARAUDERS_OPEN,
  boolean
>;

export type SetIsMessagesOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_MESSAGES_OPEN,
  boolean
>;

export const setIsArtificialIntelligenceOpen = withMatcher(
    (boolean: boolean): SetIsArtificialIntelligenceOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_ARTIFICIALINTELLIGENCE_OPEN, boolean)
);

export const setIsVitalsOpen = withMatcher(
    (boolean: boolean): SetIsVitalsOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_VITALS_OPEN, boolean)
);

export const setIsPostOpen = withMatcher(
    (boolean: boolean): SetIsPostOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_POST_OPEN, boolean)
);

export const setIsSolarSystemOpen = withMatcher(
    (boolean: boolean): SetIsSolarSystemOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_SOLARSYSTEM_OPEN, boolean)
);

export const setIsPlanetsOpen = withMatcher(
    (boolean: boolean): SetIsPlanetsOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_PLANETS_OPEN, boolean)
);

export const setIsMoonsOpen = withMatcher(
    (boolean: boolean): SetIsMoonsOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_MOONS_OPEN, boolean)
);

export const setIsMaraudersOpen = withMatcher(
    (boolean: boolean): SetIsMaraudersOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_MARAUDERS_OPEN, boolean)
);

export const setIsMessagesOpen = withMatcher(
    (boolean: boolean): SetIsMessagesOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_MESSAGES_OPEN, boolean)
);


import { TOOLBOX_ACTION_TYPES } from "./toolbox.types";
import {
    createAction,
    withMatcher,
    ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

export type SetIsArtificialIntelligenceOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_ARTIFICIALINTELLIGENCE_OPEN,
  boolean
>;

export type SetIsVitalsOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_VITALS_OPEN,
  boolean
>;

export type SetIsPostOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_POST_OPEN,
  boolean
>;

export type SetIsSolarSystemOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_SOLARSYSTEM_OPEN,
  boolean
>;

export type SetIsPlanetsOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_PLANETS_OPEN,
  boolean
>;

export type SetIsMoonsOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_MOONS_OPEN,
  boolean
>;

export type SetIsPilotsOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_PILOTS_OPEN,
  boolean
>;

export type SetIsMessagesOpen = ActionWithPayload<
  TOOLBOX_ACTION_TYPES.SET_IS_MESSAGES_OPEN,
  boolean
>;

export const setIsArtificialIntelligenceOpen = withMatcher(
    (boolean: boolean): SetIsArtificialIntelligenceOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_ARTIFICIALINTELLIGENCE_OPEN, boolean)
);

export const setIsVitalsOpen = withMatcher(
    (boolean: boolean): SetIsVitalsOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_VITALS_OPEN, boolean)
);

export const setIsPostOpen = withMatcher(
    (boolean: boolean): SetIsPostOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_POST_OPEN, boolean)
);

export const setIsSolarSystemOpen = withMatcher(
    (boolean: boolean): SetIsSolarSystemOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_SOLARSYSTEM_OPEN, boolean)
);

export const setIsPlanetsOpen = withMatcher(
    (boolean: boolean): SetIsPlanetsOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_PLANETS_OPEN, boolean)
);

export const setIsMoonsOpen = withMatcher(
    (boolean: boolean): SetIsMoonsOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_MOONS_OPEN, boolean)
);

export const setIsPilotsOpen = withMatcher(
    (boolean: boolean): SetIsPilotsOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_PILOTS_OPEN, boolean)
);

export const setIsMessagesOpen = withMatcher(
    (boolean: boolean): SetIsMessagesOpen =>
    createAction(TOOLBOX_ACTION_TYPES.SET_IS_MESSAGES_OPEN, boolean)
);


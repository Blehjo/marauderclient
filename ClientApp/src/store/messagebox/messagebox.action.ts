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

export type SetIsDevicesOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_DEVICES_OPEN,
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

export type SetIsEditorOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_EDITOR_OPEN,
  boolean
>;

export type SetIsBuilderOpen = ActionWithPayload<
  MESSAGEBOX_ACTION_TYPES.SET_IS_BUILDER_OPEN,
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

export const setIsDevicesOpen = withMatcher(
    (boolean: boolean): SetIsDevicesOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_DEVICES_OPEN, boolean)
);

export const setIsPostOpen = withMatcher(
    (boolean: boolean): SetIsPostOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_POST_OPEN, boolean)
);

export const setIsSolarSystemOpen = withMatcher(
    (boolean: boolean): SetIsSolarSystemOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_SOLARSYSTEM_OPEN, boolean)
);

export const setIsEditorOpen = withMatcher(
    (boolean: boolean): SetIsEditorOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_EDITOR_OPEN, boolean)
);

export const setIsBuilderOpen = withMatcher(
    (boolean: boolean): SetIsBuilderOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_BUILDER_OPEN, boolean)
);

export const setIsMaraudersOpen = withMatcher(
    (boolean: boolean): SetIsMaraudersOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_MARAUDERS_OPEN, boolean)
);

export const setIsMessagesOpen = withMatcher(
    (boolean: boolean): SetIsMessagesOpen =>
    createAction(MESSAGEBOX_ACTION_TYPES.SET_IS_MESSAGES_OPEN, boolean)
);


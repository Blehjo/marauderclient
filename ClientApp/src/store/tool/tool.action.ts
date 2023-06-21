import { TOOL_ACTION_TYPES } from './tool.types';
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

export type SetIsToolOpen = ActionWithPayload<
  TOOL_ACTION_TYPES.SET_IS_TOOL_OPEN,
  boolean
>;

export const setIsToolOpen = withMatcher(
  (boolean: boolean): SetIsToolOpen =>
    createAction(TOOL_ACTION_TYPES.SET_IS_TOOL_OPEN, boolean)
);

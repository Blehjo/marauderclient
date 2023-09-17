import { ARTIFICIALINTELLIGENCE_ACTION_TYPES, ArtificialIntelligence } from './artificialintelligence.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';

export type ArtificialIntelligenceCreateStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_START, { name: string, role: string, imageFile: File }
>;

export type ArtificialIntelligenceCreateSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceCreateFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ArtificialIntelligenceUpdateStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_START, { artificialIntelligenceId: number, name: string, role: string, imageFile: File }
>;

export type ArtificialIntelligenceUpdateSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceUpdateFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ArtificialIntelligenceDeleteStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_START, { artificialIntelligenceId: number }
>;

export type ArtificialIntelligenceDeleteSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceDeleteteFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ArtificialIntelligenceFetchSingleStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_START, { artificialIntelligenceId: number }
>;

export type ArtificialIntelligenceFetchSingleSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    ArtificialIntelligence
>;

export type ArtificialIntelligenceFetchSingleFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ArtificialIntelligenceFetchUsersStart = Action<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START
>;

export type ArtificialIntelligenceFetchUsersSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceFetchUsersFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED,
    Error
>;

export type ArtificialIntelligenceFetchOtherUsersStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, { userId: string }
>;

export type ArtificialIntelligenceFetchOtherUsersSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceFetchOtherUsersFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED,
    Error
>;

export type ArtificialIntelligenceFetchAllStart = Action<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_START
>;

export type ArtificialIntelligenceFetchAllSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    ArtificialIntelligence[]
>;

export type ArtificialIntelligenceFetchAllFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const artificialIntelligenceCreateStart = withMatcher(
    (name: string, role: string, imageFile: File): ArtificialIntelligenceCreateStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_START, { name, role, imageFile})
);

export const artificialIntelligenceCreateSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceCreateSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceCreateFailed = withMatcher(
    (error: Error) => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_START, error)
);
 
export const artificialIntelligenceUpdateStart = withMatcher(
    (artificialIntelligenceId: number, name: string, role: string, imageFile: File): ArtificialIntelligenceUpdateStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_START, { artificialIntelligenceId, name, role, imageFile})
);

export const artificialIntelligenceUpdateSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceUpdateSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceUpdateFailed = withMatcher(
    (error: Error): ArtificialIntelligenceUpdateFailed => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const artificialIntelligenceDeleteStart = withMatcher(
    (artificialIntelligenceId: number): ArtificialIntelligenceDeleteStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_START, { artificialIntelligenceId })
);

export const artificialIntelligenceDeleteSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceDeleteSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_START, error)
);

export const artificialIntelligenceFetchSingleStart = withMatcher(
    (artificialIntelligenceId: number): ArtificialIntelligenceFetchSingleStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_START, { artificialIntelligenceId })
);

export const artificialIntelligenceFetchSingleSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence): ArtificialIntelligenceFetchSingleSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceFetchSingleFailed = withMatcher(
    (error: Error): ArtificialIntelligenceFetchSingleFailed => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const artificialIntelligenceFetchUsersStart = withMatcher(
    (): ArtificialIntelligenceFetchUsersStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START)
);

export const artificialIntelligenceFetchUsersSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceFetchUsersSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceFetchUsersFailed = withMatcher(
    (error: Error): ArtificialIntelligenceFetchUsersFailed => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED, error)
);

export const artificialIntelligenceFetchOtherUsersStart = withMatcher(
    (userId: string): ArtificialIntelligenceFetchOtherUsersStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, { userId })
);

export const artificialIntelligenceFetchOtherUsersSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceFetchOtherUsersSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceFetchOtherUsersFailed = withMatcher(
    (error: Error): ArtificialIntelligenceFetchOtherUsersFailed => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED, error)
);

export const artificialIntelligenceFetchAllStart = withMatcher(
    (): ArtificialIntelligenceFetchAllStart => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_START)
);

export const artificialIntelligenceFetchAllSuccess = withMatcher(
    (artificialIntelligence: ArtificialIntelligence[]): ArtificialIntelligenceFetchAllSuccess => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_SUCCESS, artificialIntelligence)
);

export const artificialIntelligenceFetchAllFailed = withMatcher(
    (error: Error): ArtificialIntelligenceFetchAllFailed => 
    createAction(ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
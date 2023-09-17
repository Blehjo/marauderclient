import { ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES, ArtificialIntelligenceChat } from './artificialintelligencechat.types';

import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { ArtificialIntelligence } from '../artificialintelligence/artificialintelligence.types';
import { Chat } from '../chat/chat.types';

export type ArtificialIntelligenceChatCreateStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_START, { artificialIntelligenceId: number, artificialIntelligence: ArtificialIntelligence, chatId: number, chat: Chat }
>;

export type ArtificialIntelligenceChatCreateSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatCreateFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ArtificialIntelligenceChatUpdateStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_START, { artificialIntelligenceChatId: number, name: string, role: string, imageFile: File }
>;

export type ArtificialIntelligenceChatUpdateSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatUpdateFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ArtificialIntelligenceChatDeleteStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_START, { artificialIntelligenceChatId: number }
>;

export type ArtificialIntelligenceChatDeleteSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatDeleteteFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ArtificialIntelligenceChatFetchSingleStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_START, { artificialIntelligenceChatId: number }
>;

export type ArtificialIntelligenceChatFetchSingleSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    ArtificialIntelligenceChat
>;

export type ArtificialIntelligenceChatFetchSingleFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ArtificialIntelligenceChatFetchUsersStart = Action<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START
>;

export type ArtificialIntelligenceChatFetchUsersSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatFetchUsersFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED,
    Error
>;

export type ArtificialIntelligenceChatFetchOtherUsersStart = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, { userId: string }
>;

export type ArtificialIntelligenceChatFetchOtherUsersSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatFetchOtherUsersFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED,
    Error
>;

export type ArtificialIntelligenceChatFetchAllStart = Action<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_START
>;

export type ArtificialIntelligenceChatFetchAllSuccess = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    ArtificialIntelligenceChat[]
>;

export type ArtificialIntelligenceChatFetchAllFailed = ActionWithPayload<
    ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const artificialIntelligenceChatCreateStart = withMatcher(
    (artificialIntelligenceId: number, artificialIntelligence: ArtificialIntelligence, chatId: number, chat: Chat): ArtificialIntelligenceChatCreateStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_START, { artificialIntelligenceId, artificialIntelligence, chatId, chat })
);

export const artificialIntelligenceChatCreateSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatCreateSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatCreateFailed = withMatcher(
    (error: Error) => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.CREATE_START, error)
);
 
export const artificialIntelligenceChatUpdateStart = withMatcher(
    (artificialIntelligenceChatId: number, name: string, role: string, imageFile: File): ArtificialIntelligenceChatUpdateStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_START, { artificialIntelligenceChatId, name, role, imageFile})
);

export const artificialIntelligenceChatUpdateSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatUpdateSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatUpdateFailed = withMatcher(
    (error: Error): ArtificialIntelligenceChatUpdateFailed => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const artificialIntelligenceChatDeleteStart = withMatcher(
    (artificialIntelligenceChatId: number): ArtificialIntelligenceChatDeleteStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_START, { artificialIntelligenceChatId })
);

export const artificialIntelligenceChatDeleteSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatDeleteSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.DELETE_START, error)
);

export const artificialIntelligenceChatFetchSingleStart = withMatcher(
    (artificialIntelligenceChatId: number): ArtificialIntelligenceChatFetchSingleStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_START, { artificialIntelligenceChatId })
);

export const artificialIntelligenceChatFetchSingleSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat): ArtificialIntelligenceChatFetchSingleSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatFetchSingleFailed = withMatcher(
    (error: Error): ArtificialIntelligenceChatFetchSingleFailed => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const artificialIntelligenceChatFetchUsersStart = withMatcher(
    (): ArtificialIntelligenceChatFetchUsersStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START)
);

export const artificialIntelligenceChatFetchUsersSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatFetchUsersSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatFetchUsersFailed = withMatcher(
    (error: Error): ArtificialIntelligenceChatFetchUsersFailed => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED, error)
);

export const artificialIntelligenceChatFetchOtherUsersStart = withMatcher(
    (userId: string): ArtificialIntelligenceChatFetchOtherUsersStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START, { userId })
);

export const artificialIntelligenceChatFetchOtherUsersSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatFetchOtherUsersSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatFetchOtherUsersFailed = withMatcher(
    (error: Error): ArtificialIntelligenceChatFetchOtherUsersFailed => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED, error)
);

export const artificialIntelligenceChatFetchAllStart = withMatcher(
    (): ArtificialIntelligenceChatFetchAllStart => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_START)
);

export const artificialIntelligenceChatFetchAllSuccess = withMatcher(
    (artificialIntelligenceChat: ArtificialIntelligenceChat[]): ArtificialIntelligenceChatFetchAllSuccess => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, artificialIntelligenceChat)
);

export const artificialIntelligenceChatFetchAllFailed = withMatcher(
    (error: Error): ArtificialIntelligenceChatFetchAllFailed => 
    createAction(ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);
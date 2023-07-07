import { ArtificialIntelligence } from "../artificialintelligence/artificialintelligence.types";
import { Chat } from "../chat/chat.types";
import { ChatComment } from "../chatcomment/chatcomment.types";

export enum ARTIFICIALINTELLIGENCECHAT_ACTION_TYPES  {
    CREATE_START = 'artificialintelligencechat/CREATE_START',
    CREATE_SUCCESS = 'artificialintelligencechat/CREATE_SUCCESS',
    CREATE_FAILED = 'artificialintelligencechat/CREATE_FAILED',
    UPDATE_START = 'artificialintelligencechat/UPDATE_START',
    UPDATE_SUCCESS = 'artificialintelligencechat/UPDATE_SUCCESS',
    UPDATE_FAILED = 'artificialintelligencechat/UPDATE_FAILED',
    DELETE_START = 'artificialintelligencechat/DELETE_START',
    DELETE_SUCCESS = 'artificialintelligencechat/DELETE_SUCCESS',
    DELETE_FAILED = 'artificialintelligencechat/DELETE_FAILED',
    FETCH_SINGLE_START = 'artificialintelligencechat/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'artificialintelligencechat/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'artificialintelligencechat/FETCH_SINGLE_FAILED',
    FETCH_USER_ARTIFICIALINTELLIGENCE_START = 'artificialintelligencechat/FETCH_USER_ARTIFICIALINTELLIGENCE_START',
    FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS = 'artificialintelligencechat/FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS',
    FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED = 'artificialintelligencechat/FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START = 'artificialintelligencechat/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS = 'artificialintelligencechat/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED = 'artificialintelligencechat/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED',
    FETCH_ALL_START = 'artificialintelligencechat/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'artificialintelligencechat/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'artificialintelligencechat/FETCH_ALL_FAILED',
};

export type ArtificialIntelligenceChat = {
    artificialIntelligenceId: number,
    artificialIntelligence: ArtificialIntelligence,
    chatId: number | null,
    chat: Chat
}
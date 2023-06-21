import { Chat } from "../chat/chat.types";
import { ChatComment } from "../chatcomment/chatcomment.types";

export enum ARTIFICIALINTELLIGENCE_ACTION_TYPES  {
    CREATE_START = 'artificialintelligence/CREATE_START',
    CREATE_SUCCESS = 'artificialintelligence/CREATE_SUCCESS',
    CREATE_FAILED = 'artificialintelligence/CREATE_FAILED',
    UPDATE_START = 'artificialintelligence/UPDATE_START',
    UPDATE_SUCCESS = 'artificialintelligence/UPDATE_SUCCESS',
    UPDATE_FAILED = 'artificialintelligence/UPDATE_FAILED',
    DELETE_START = 'artificialintelligence/DELETE_START',
    DELETE_SUCCESS = 'artificialintelligence/DELETE_SUCCESS',
    DELETE_FAILED = 'artificialintelligence/DELETE_FAILED',
    FETCH_SINGLE_START = 'artificialintelligence/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'artificialintelligence/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'artificialintelligence/FETCH_SINGLE_FAILED',
    FETCH_USER_ARTIFICIALINTELLIGENCE_START = 'artificialintelligence/FETCH_USER_ARTIFICIALINTELLIGENCE_START',
    FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS = 'artificialintelligence/FETCH_USER_ARTIFICIALINTELLIGENCE_SUCCESS',
    FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED = 'artificialintelligence/FETCH_USER_ARTIFICIALINTELLIGENCE_FAILED',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START = 'artificialintelligence/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_START',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS = 'artificialintelligence/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_SUCCESS',
    FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED = 'artificialintelligence/FETCH_OTHER_USER_ARTIFICIALINTELLIGENCE_FAILED',
    FETCH_ALL_START = 'artificialintelligence/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'artificialintelligence/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'artificialintelligence/FETCH_ALL_FAILED',
};

export type ArtificialIntelligence = {
    artificialIntelligenceId: number;
    name: string;
    role: string | null;
    imageLink: string | null;
    imageSource: string;
    dateCreated: Date | null;
    userId: number | null,
    chats: Chat[] | null;
    chatcomments: ChatComment[] | null;
}
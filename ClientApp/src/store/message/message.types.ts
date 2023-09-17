import { MessageComment } from "../messagecomment/messagecomment.types";
import { User } from "../user/user.types";

export enum MESSAGE_ACTION_TYPES  {
    CREATE_START = 'message/CREATE_START',
    CREATE_SUCCESS = 'message/CREATE_SUCCESS',
    CREATE_FAILED = 'message/CREATE_FAILED',
    UPDATE_START = 'message/UPDATE_START',
    UPDATE_SUCCESS = 'message/UPDATE_SUCCESS',
    UPDATE_FAILED = 'message/UPDATE_FAILED',
    DELETE_START = 'message/DELETE_START',
    DELETE_SUCCESS = 'message/DELETE_SUCCESS',
    DELETE_FAILED = 'message/DELETE_FAILED',
    FETCH_SINGLE_START = 'message/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'message/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'message/FETCH_SINGLE_FAILED',
    FETCH_USER_MESSAGES_START = 'message/FETCH_USER_MESSAGES_START',
    FETCH_USER_MESSAGES_SUCCESS = 'message/FETCH_USER_MESSAGES_SUCCESS',
    FETCH_USER_MESSAGES_FAILED = 'message/FETCH_USER_MESSAGES_FAILED',
    FETCH_ALL_START = 'message/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'message/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'message/FETCH_ALL_FAILED',
    SET_ID = 'message/SET_ID',
    SET_ID_SUCCESS = 'message/SET_ID_SUCCESS'
};

export type Message = {
    messageId: number;
    messageValue: string | null;
    dateCreated: Date | null;
    userId: string | null,
    user: User,
    receiver: User,
    messageComments: MessageComment[];
}
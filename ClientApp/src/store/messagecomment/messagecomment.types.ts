import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";
export enum MESSAGECOMMENT_ACTION_TYPES  {
    CREATE_START = 'messagecomment/CREATE_START',
    CREATE_SUCCESS = 'messagecomment/CREATE_SUCCESS',
    CREATE_FAILED = 'messagecomment/CREATE_FAILED',
    UPDATE_START = 'messagecomment/UPDATE_START',
    UPDATE_SUCCESS = 'messagecomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'messagecomment/UPDATE_FAILED',
    DELETE_START = 'messagecomment/DELETE_START',
    DELETE_SUCCESS = 'messagecomment/DELETE_SUCCESS',
    DELETE_FAILED = 'messagecomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'messagecomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'messagecomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'messagecomment/FETCH_SINGLE_FAILED',
    FETCH_USER_MESSAGECOMMENTS_START = 'messagecomment/FETCH_USER_MESSAGECOMMENTS_START',
    FETCH_USER_MESSAGECOMMENTS_SUCCESS = 'messagecomment/FETCH_USER_MESSAGECOMMENTS_SUCCESS',
    FETCH_USER_MESSAGECOMMENTS_FAILED = 'messagecomment/FETCH_USER_MESSAGECOMMENTS_FAILED',
    FETCH_ALL_START = 'messagecomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'messagecomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'messagecomment/FETCH_ALL_FAILED',
    SET_ID = 'messagecomment/SET_ID_START',
    SET_ID_SUCCESS = 'messagecomment/SET_ID_SUCCESS',
    SET_ID_FAILED = 'messagecomment/SET_ID_FAILED'
};

export type MessageComment = {
    messageCommentId: number | null;
    messageValue: string;
    mediaLink: string | null;
    imageSource: string | null;
    type: string | null;
    dateCreated: Date;
    messageId: number | null;
    userId: string | null;
    user: User | null;
    favorites: Favorite[] | null;
}
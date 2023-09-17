export enum CHATCOMMENT_ACTION_TYPES {
    CREATE_START = 'chatcomment/CREATE_START',
    CREATE_SUCCESS = 'chatcomment/CREATE_SUCCESS',
    CREATE_FAILED = 'chatcomment/CREATE_FAILED',
    UPDATE_START = 'chatcomment/UPDATE_START',
    UPDATE_SUCCESS = 'chatcomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'chatcomment/UPDATE_FAILED',
    DELETE_START = 'chatcomment/DELETE_START',
    DELETE_SUCCESS = 'chatcomment/DELETE_SUCCESS',
    DELETE_FAILED = 'chatcomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'chatcomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'chatcomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'chatcomment/FETCH_SINGLE_FAILED',
    FETCH_USER_CHATCOMMENTS_START = 'chatcomment/FETCH_USER_CHATCOMMENTS_START',
    FETCH_USER_CHATCOMMENTS_SUCCESS = 'chatcomment/FETCH_USER_CHATCOMMENTS_SUCCESS',
    FETCH_USER_CHATCOMMENTS_FAILED = 'chatcomment/FETCH_USER_CHATCOMMENTS_FAILED',
    FETCH_ALL_START = 'chatcomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'chatcomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'chatcomment/FETCH_ALL_FAILED',
};

export type ChatComment = {
    chatCommentId: number | null;
    chatValue: string;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    userId: string | null,
}
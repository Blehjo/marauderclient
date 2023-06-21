export enum COMMENT_ACTION_TYPES {
    CREATE_START = 'comment/CREATE_START',
    CREATE_SUCCESS = 'comment/CREATE_SUCCESS',
    CREATE_FAILED = 'comment/CREATE_FAILED',
    UPDATE_START = 'comment/UPDATE_START',
    UPDATE_SUCCESS = 'comment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'comment/UPDATE_FAILED',
    DELETE_START = 'comment/DELETE_START',
    DELETE_SUCCESS = 'comment/DELETE_SUCCESS',
    DELETE_FAILED = 'comment/DELETE_FAILED',
    FETCH_SINGLE_START = 'comment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'comment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'comment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'comment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'comment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'comment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'comment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'comment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'comment/FETCH_ALL_FAILED',
};

export type Comment = {
    commentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    postId: number | null,
    userId: number | null,
}
export enum MOON_COMMENT_ACTION_TYPES {
    CREATE_START = 'mooncomment/CREATE_START',
    CREATE_SUCCESS = 'mooncomment/CREATE_SUCCESS',
    CREATE_FAILED = 'mooncomment/CREATE_FAILED',
    UPDATE_START = 'mooncomment/UPDATE_START',
    UPDATE_SUCCESS = 'mooncomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'mooncomment/UPDATE_FAILED',
    DELETE_START = 'mooncomment/DELETE_START',
    DELETE_SUCCESS = 'mooncomment/DELETE_SUCCESS',
    DELETE_FAILED = 'mooncomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'mooncomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'mooncomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'mooncomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'mooncomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'mooncomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'mooncomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'mooncomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'mooncomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'mooncomment/FETCH_ALL_FAILED',
};

export type MoonComment = {
    moonCommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    postId: number | null,
    userId: number | null,
}
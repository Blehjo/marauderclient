export enum PLANET_COMMENT_ACTION_TYPES {
    CREATE_START = 'planetcomment/CREATE_START',
    CREATE_SUCCESS = 'planetcomment/CREATE_SUCCESS',
    CREATE_FAILED = 'planetcomment/CREATE_FAILED',
    UPDATE_START = 'planetcomment/UPDATE_START',
    UPDATE_SUCCESS = 'planetcomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'planetcomment/UPDATE_FAILED',
    DELETE_START = 'planetcomment/DELETE_START',
    DELETE_SUCCESS = 'planetcomment/DELETE_SUCCESS',
    DELETE_FAILED = 'planetcomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'planetcomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'planetcomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'planetcomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'planetcomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'planetcomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'planetcomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'planetcomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'planetcomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'planetcomment/FETCH_ALL_FAILED',
};

export type PlanetComment = {
    planetCommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    postId: number | null,
    userId: number | null,
}
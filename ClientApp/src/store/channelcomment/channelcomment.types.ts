export enum CHANNEL_COMMENT_ACTION_TYPES {
    CREATE_START = 'channelcomment/CREATE_START',
    CREATE_SUCCESS = 'channelcomment/CREATE_SUCCESS',
    CREATE_FAILED = 'channelcomment/CREATE_FAILED',
    UPDATE_START = 'channelcomment/UPDATE_START',
    UPDATE_SUCCESS = 'channelcomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'channelcomment/UPDATE_FAILED',
    DELETE_START = 'channelcomment/DELETE_START',
    DELETE_SUCCESS = 'channelcomment/DELETE_SUCCESS',
    DELETE_FAILED = 'channelcomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'channelcomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'channelcomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'channelcomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'channelcomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'channelcomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'channelcomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'channelcomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'channelcomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'channelcomment/FETCH_ALL_FAILED',
    SET_ID_START = 'channelcomment/SET_ID_START',
    SET_ID_SUCCESS = 'channelcomment/SET_ID_SUCCESS',
    SET_ID_FAILED = 'channelcomment/SET_ID_FAILED'
};

export type ChannelComment = {
    channelCommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    imageSource: string | null;
    type: string | null;
    dateCreated: Date;
    channelId: number | null,
    userId: string | null,
}
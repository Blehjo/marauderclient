import { User } from "../user/user.types";

export enum COMMENT_ACTION_TYPES {
    CREATE_START = 'userchatcomment/CREATE_START',
    CREATE_SUCCESS = 'userchatcomment/CREATE_SUCCESS',
    CREATE_FAILED = 'userchatcomment/CREATE_FAILED',
    UPDATE_START = 'userchatcomment/UPDATE_START',
    UPDATE_SUCCESS = 'userchatcomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'userchatcomment/UPDATE_FAILED',
    DELETE_START = 'userchatcomment/DELETE_START',
    DELETE_SUCCESS = 'userchatcomment/DELETE_SUCCESS',
    DELETE_FAILED = 'userchatcomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'userchatcomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'userchatcomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'userchatcomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'userchatcomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'userchatcomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'userchatcomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'userchatcomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'userchatcomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'userchatcomment/FETCH_ALL_FAILED',
};

export type UserChatComment = {
    userChatCommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    postId: number | null,
    user: User,
    userId: string | null,
}
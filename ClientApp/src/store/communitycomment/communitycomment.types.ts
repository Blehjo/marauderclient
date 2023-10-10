import { User } from "../user/user.types";

export enum COMMUNITY_COMMENT_ACTION_TYPES {
    CREATE_START = 'communitycomment/CREATE_START',
    CREATE_SUCCESS = 'communitycomment/CREATE_SUCCESS',
    CREATE_FAILED = 'communitycomment/CREATE_FAILED',
    UPDATE_START = 'communitycomment/UPDATE_START',
    UPDATE_SUCCESS = 'communitycomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'communitycomment/UPDATE_FAILED',
    DELETE_START = 'communitycomment/DELETE_START',
    DELETE_SUCCESS = 'communitycomment/DELETE_SUCCESS',
    DELETE_FAILED = 'communitycomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'communitycomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'communitycomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'communitycomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'communitycomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'communitycomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'communitycomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'communitycomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'communitycomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'communitycomment/FETCH_ALL_FAILED',
};

export type CommunityComment = {
    communitycommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    communitypostId: number | null,
    user: User,
    userId: string | null,
}
import { User } from "../user/user.types";

export enum COMMENT_ACTION_TYPES {
    CREATE_START = 'gltfcomment/CREATE_START',
    CREATE_SUCCESS = 'gltfcomment/CREATE_SUCCESS',
    CREATE_FAILED = 'gltfcomment/CREATE_FAILED',
    UPDATE_START = 'gltfcomment/UPDATE_START',
    UPDATE_SUCCESS = 'gltfcomment/UPDATE_SUCCESS',
    UPDATE_FAILED = 'gltfcomment/UPDATE_FAILED',
    DELETE_START = 'gltfcomment/DELETE_START',
    DELETE_SUCCESS = 'gltfcomment/DELETE_SUCCESS',
    DELETE_FAILED = 'gltfcomment/DELETE_FAILED',
    FETCH_SINGLE_START = 'gltfcomment/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'gltfcomment/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'gltfcomment/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMENTS_START = 'gltfcomment/FETCH_USER_COMMENTS_START',
    FETCH_USER_COMMENTS_SUCCESS = 'gltfcomment/FETCH_USER_COMMENTS_SUCCESS',
    FETCH_USER_COMMENTS_FAILED = 'gltfcomment/FETCH_USER_COMMENTS_FAILED',
    FETCH_ALL_START = 'gltfcomment/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'gltfcomment/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'gltfcomment/FETCH_ALL_FAILED',
};

export type GltfComment = {
    gltfCommentId: number | null;
    commentValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    postId: number | null,
    user: User,
    userId: string | null,
}
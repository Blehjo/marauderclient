import { Comment } from "../comment/comment.types";
import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";

export enum POST_ACTION_TYPES  {
    CREATE_START = 'post/CREATE_START',
    CREATE_SUCCESS = 'post/CREATE_SUCCESS',
    CREATE_FAILED = 'post/CREATE_FAILED',
    UPDATE_START = 'post/UPDATE_START',
    UPDATE_SUCCESS = 'post/UPDATE_SUCCESS',
    UPDATE_FAILED = 'post/UPDATE_FAILED',
    DELETE_START = 'post/DELETE_START',
    DELETE_SUCCESS = 'post/DELETE_SUCCESS',
    DELETE_FAILED = 'post/DELETE_FAILED',
    FETCH_SINGLE_START = 'post/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'post/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'post/FETCH_SINGLE_FAILED',
    FETCH_USER_POSTS_START = 'post/FETCH_USER_POSTS_START',
    FETCH_USER_POSTS_SUCCESS = 'post/FETCH_USER_POSTS_SUCCESS',
    FETCH_USER_POSTS_FAILED = 'post/FETCH_USER_POSTS_FAILED',
    FETCH_ALL_START = 'post/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'post/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'post/FETCH_ALL_FAILED',
};

export type Post = {
    postId: number;
    postValue: string | null;
    mediaLink: string | null;
    imageSource: string;
    type: string;
    dateCreated: Date;
    userId: number | null,
    user: User,
    comments: Comment[];
    favorites: Favorite[];
}
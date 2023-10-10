import { CommunityComment } from "../communitycomment/communitycomment.types";
import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";

export enum COMMUNITY_POST_ACTION_TYPES  {
    CREATE_START = 'communitypost/CREATE_START',
    CREATE_SUCCESS = 'communitypost/CREATE_SUCCESS',
    CREATE_FAILED = 'communitypost/CREATE_FAILED',
    UPDATE_START = 'communitypost/UPDATE_START',
    UPDATE_SUCCESS = 'communitypost/UPDATE_SUCCESS',
    UPDATE_FAILED = 'communitypost/UPDATE_FAILED',
    DELETE_START = 'communitypost/DELETE_START',
    DELETE_SUCCESS = 'communitypost/DELETE_SUCCESS',
    DELETE_FAILED = 'communitypost/DELETE_FAILED',
    FETCH_SINGLE_START = 'communitypost/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'communitypost/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'communitypost/FETCH_SINGLE_FAILED',
    FETCH_USER_POSTS_START = 'communitypost/FETCH_USER_POSTS_START',
    FETCH_USER_POSTS_SUCCESS = 'communitypost/FETCH_USER_POSTS_SUCCESS',
    FETCH_USER_POSTS_FAILED = 'communitypost/FETCH_USER_POSTS_FAILED',
    FETCH_ALL_START = 'communitypost/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'communitypost/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'communitypost/FETCH_ALL_FAILED',
};

export type CommunityPost = {
    communityPostId: number;
    postValue: string | null;
    mediaLink: string | null;
    imageSource: string;
    type: string;
    dateCreated: Date;
    userId: string | null,
    user: User,
    communityComments: CommunityComment[];
    favorites: Favorite[];
}
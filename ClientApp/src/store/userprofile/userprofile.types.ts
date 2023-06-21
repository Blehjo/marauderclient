import { Favorite } from "../favorite/favorite.types";
import { Follower } from "../follower/follower.types";
import { Moon } from "../moon/moon.types";
import { Planet } from "../planet/planet.types";
import { Post } from "../post/post.types";

export enum USERPROFILE_ACTION_TYPES {
    CREATE_START = 'userprofile/CREATE_START',
    CREATE_SUCCESS = 'userprofile/CREATE_SUCCESS',
    CREATE_FAILED = 'userprofile/CREATE_FAILED',
    UPDATE_START = 'userprofile/UPDATE_START',
    UPDATE_SUCCESS = 'userprofile/UPDATE_SUCCESS',
    UPDATE_FAILED = 'userprofile/UPDATE_FAILED',
    DELETE_START = 'userprofile/DELETE_START',
    DELETE_SUCCESS = 'userprofile/DELETE_SUCCESS',
    DELETE_FAILED = 'userprofile/DELETE_FAILED',
    FETCH_SINGLE_START = 'userprofile/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'userprofile/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'userprofile/FETCH_SINGLE_FAILED',
    FETCH_USERPROFILE_START = 'userprofile/FETCH_USERPROFILE_START',
    FETCH_USERPROFILE_SUCCESS = 'userprofile/FETCH_USERPROFILE_SUCCESS',
    FETCH_USERPROFILE_FAILED = 'userprofile/FETCH_USERPROFILE_FAILED',
    FETCH_ALL_START = 'userprofile/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'userprofile/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'userprofile/FETCH_ALL_FAILED',
};

export type Userprofile = {
    userId: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: Date | null;
    emailAddress: string | null;
    password: string | null;
    about: string | null;
    imageLink: string | null;
    imageSource: string | null;
    dateCreated: Date | null;
    posts: Post[] | null;
    planets: Planet[] | null;
    moons: Moon[] | null;
    followers: Follower[] | null;
    favorites: Favorite[] | null;
}
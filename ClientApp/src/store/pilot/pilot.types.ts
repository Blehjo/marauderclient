import { Favorite } from "../favorite/favorite.types";
import { Follower } from "../follower/follower.types";
import { Moon } from "../moon/moon.types";
import { Planet } from "../planet/planet.types";
import { Post } from "../post/post.types";

export enum PILOT_ACTION_TYPES  {
    FETCH_SINGLE_START = 'pilot/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'pilot/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'pilot/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'pilot/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'pilot/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'pilot/FETCH_ALL_FAILED',
};

export type Pilot = {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    emailAddress: string;
    password: string;
    about: string;
    imageLink: string;
    imageSource: string;
    type: string;
    dateCreated: Date;
    posts: Post[];
    planets: Planet[];
    moons: Moon[];
    followers: Follower[];
    favorites: Favorite[];
}
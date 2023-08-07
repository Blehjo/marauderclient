import { Chat } from "../chat/chat.types";
import { Community } from "../community/community.types";
import { Device } from "../device/device.types";
import { Favorite } from "../favorite/favorite.types";
import { Follower } from "../follower/follower.types";
import { Post } from "../post/post.types";

export enum MARAUDER_ACTION_TYPES  {
    SET_ID_START = 'marauder/SET_ID_START',
    SET_ID_SUCCESS = 'marauder/SET_ID_SUCCESS',
    SET_ID_FAILED = 'marauder/SET_ID_FAILED',
    FETCH_SINGLE_START = 'marauder/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'marauder/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'marauder/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'marauder/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'marauder/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'marauder/FETCH_ALL_FAILED',
};

export type Marauder = {
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
    devices: Device[];
    chats: Chat[];
    communities: Community[];
    followers: Follower[];
    favorites: Favorite[];
}
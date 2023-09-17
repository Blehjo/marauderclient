import { Chat } from "../chat/chat.types";
import { Community } from "../community/community.types";
import { Device } from "../device/device.types";
import { Favorite } from "../favorite/favorite.types";
import { Follower } from "../follower/follower.types";
import { Post } from "../post/post.types";

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = 'user/SET_CURRENT_USER',
    CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
    SIGN_UP_START = 'user/SIGN_UP_START',
    SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
    SIGN_UP_FAILED = 'user/SIGN_UP_FAILED',
    SIGN_OUT_START = 'user/SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
};

export type User = {
    userId: string;
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
    posts: Post[];
    devices: Device[];
    chats: Chat[];
    communities: Community[];
    followers: Follower[];
    favorites: Favorite[];
}
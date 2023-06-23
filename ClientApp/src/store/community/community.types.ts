import { Channel } from "../channel/channel.types";
import { Member } from "../member/member.types";
import { User } from "../user/user.types";

export enum PLANET_ACTION_TYPES  {
    CREATE_START = 'community/CREATE_START',
    CREATE_SUCCESS = 'community/CREATE_SUCCESS',
    CREATE_FAILED = 'community/CREATE_FAILED',
    UPDATE_START = 'community/UPDATE_START',
    UPDATE_SUCCESS = 'community/UPDATE_SUCCESS',
    UPDATE_FAILED = 'community/UPDATE_FAILED',
    DELETE_START = 'community/DELETE_START',
    DELETE_SUCCESS = 'community/DELETE_SUCCESS',
    DELETE_FAILED = 'community/DELETE_FAILED',
    FETCH_SINGLE_START = 'community/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'community/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'community/FETCH_SINGLE_FAILED',
    FETCH_USER_COMMUNITIES_START = 'community/FETCH_USER_COMMUNITIES_START',
    FETCH_USER_COMMUNITIES_SUCCESS = 'community/FETCH_USER_COMMUNITIES_SUCCESS',
    FETCH_USER_COMMUNITIES_FAILED = 'community/FETCH_USER_COMMUNITIES_FAILED',
    FETCH_OTHER_USER_COMMUNITIES_START = 'community/FETCH_OTHER_USER_COMMUNITIES_START',
    FETCH_OTHER_USER_COMMUNITIES_SUCCESS = 'community/FETCH_OTHER_USER_COMMUNITIES_SUCCESS',
    FETCH_OTHER_USER_COMMUNITIES_FAILED = 'community/FETCH_OTHER_USER_COMMUNITIES_FAILED',
    FETCH_ALL_START = 'community/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'community/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'community/FETCH_ALL_FAILED',
};

export type Community = {
    communityId: number;
    groupName: string;
    description: string;
    modelLink: string;
    imageSource: string;
    mediaLink: string | null;
    dateCreated: Date;
    user: User;
    members: Member[];
    channels: Channel[];
}
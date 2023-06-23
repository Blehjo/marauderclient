import { Community } from "../community/community.types";
import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";

export enum MEMBER_ACTION_TYPES  {
    CREATE_START = 'member/CREATE_START',
    CREATE_SUCCESS = 'member/CREATE_SUCCESS',
    CREATE_FAILED = 'member/CREATE_FAILED',
    UPDATE_START = 'member/UPDATE_START',
    UPDATE_SUCCESS = 'member/UPDATE_SUCCESS',
    UPDATE_FAILED = 'member/UPDATE_FAILED',
    DELETE_START = 'member/DELETE_START',
    DELETE_SUCCESS = 'member/DELETE_SUCCESS',
    DELETE_FAILED = 'member/DELETE_FAILED',
    FETCH_SINGLE_START = 'member/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'member/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'member/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'member/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'member/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'member/FETCH_ALL_FAILED',
};

export type Member = {
   memberId: number;
   dateCreated: Date;
   community: Community;
   user: User;
}
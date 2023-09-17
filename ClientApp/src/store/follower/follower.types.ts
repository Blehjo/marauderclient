export enum FOLLOWER_ACTION_TYPES  {
    CREATE_START = 'follower/CREATE_START',
    CREATE_SUCCESS = 'follower/CREATE_SUCCESS',
    CREATE_FAILED = 'follower/CREATE_FAILED',
    UPDATE_START = 'follower/UPDATE_START',
    UPDATE_SUCCESS = 'follower/UPDATE_SUCCESS',
    UPDATE_FAILED = 'follower/UPDATE_FAILED',
    DELETE_START = 'follower/DELETE_START',
    DELETE_SUCCESS = 'follower/DELETE_SUCCESS',
    DELETE_FAILED = 'follower/DELETE_FAILED',
    FETCH_SINGLE_START = 'follower/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'follower/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'follower/FETCH_SINGLE_FAILED',
    FETCH_USER_FOLLOWERS_START = 'follower/FETCH_USER_FOLLOWERS_START',
    FETCH_USER_FOLLOWERS_SUCCESS = 'follower/FETCH_USER_FOLLOWERS_SUCCESS',
    FETCH_USER_FOLLOWERS_FAILED = 'follower/FETCH_USER_FOLLOWERS_FAILED',
    FETCH_ALL_START = 'follower/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'follower/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'follower/FETCH_ALL_FAILED',
};

export type Follower = {
    followerId: number | null;
    followerUser: number;
    userId: string | null;
    dateCreated: Date | null;
}
import { ArtificialIntelligence } from "../artificialintelligence/artificialintelligence.types";
import { ChatComment } from "../chatcomment/chatcomment.types"
import { Comment } from "../comment/comment.types";
import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";
import { UserChatComment } from "../userchatcomment/userchatcomment.types";

export enum CHAT_ACTION_TYPES  {
    CREATE_START = 'chat/CREATE_START',
    CREATE_SUCCESS = 'chat/CREATE_SUCCESS',
    CREATE_FAILED = 'chat/CREATE_FAILED',
    UPDATE_START = 'chat/UPDATE_START',
    UPDATE_SUCCESS = 'chat/UPDATE_SUCCESS',
    UPDATE_FAILED = 'chat/UPDATE_FAILED',
    DELETE_START = 'chat/DELETE_START',
    DELETE_SUCCESS = 'chat/DELETE_SUCCESS',
    DELETE_FAILED = 'chat/DELETE_FAILED',
    FETCH_SINGLE_START = 'chat/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'chat/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'chat/FETCH_SINGLE_FAILED',
    FETCH_USER_CHATS_START = 'chat/FETCH_USER_CHATS_START',
    FETCH_USER_CHATS_SUCCESS = 'chat/FETCH_USER_CHATS_SUCCESS',
    FETCH_USER_CHATS_FAILED = 'chat/FETCH_USER_CHATS_FAILED',
    FETCH_SINGLE_USER_CHATS_START = 'chat/FETCH_SINGLE_USER_CHATS_START',
    FETCH_SINGLE_USER_CHATS_SUCCESS = 'chat/FETCH_SINGLE_USER_CHATS_SUCCESS',
    FETCH_SINGLE_USER_CHATS_FAILED = 'chat/FETCH_SINGLE_USER_CHATS_FAILED',
    FETCH_ALL_START = 'chat/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'chat/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'chat/FETCH_ALL_FAILED',
    SET_ID = 'chat/SET_ID',
    SET_ID_SUCCESS = 'chat/SET_ID_SUCCESS'
};

export type Chat = {
    chatId: number;
    title: string;
    artificialIntelligenceId: number;
    artificialIntelligence: ArtificialIntelligence;
    dateCreated: Date;
    type: string;
    userId: number | null;
    user: User;
    chatComments: ChatComment[];
    userChatComments: UserChatComment[];
    comments: Comment[] | null;
    favorites: Favorite[];
}
import { AnyAction } from 'redux';

import { ArtificialIntelligenceChat } from './artificialintelligencechat.types';

import {
    artificialIntelligenceChatCreateFailed,
    artificialIntelligenceChatCreateStart,
    artificialIntelligenceChatCreateSuccess,
    artificialIntelligenceChatDeleteFailed,
    artificialIntelligenceChatDeleteStart,
    artificialIntelligenceChatDeleteSuccess,
    artificialIntelligenceChatFetchAllFailed,
    artificialIntelligenceChatFetchAllStart,
    artificialIntelligenceChatFetchAllSuccess,
    artificialIntelligenceChatFetchOtherUsersStart,
    artificialIntelligenceChatFetchSingleFailed,
    artificialIntelligenceChatFetchSingleStart,
    artificialIntelligenceChatFetchSingleSuccess,
    artificialIntelligenceChatFetchUsersStart,
    artificialIntelligenceChatFetchUsersSuccess,
    artificialIntelligenceChatUpdateFailed,
    artificialIntelligenceChatUpdateStart,
    artificialIntelligenceChatUpdateSuccess,
} from './artificialintelligencechat.action';

export type ArtificialIntelligenceChatState = {
    readonly artificialIntelligenceChatId: number | null;
    readonly singleArtificialIntelligenceChat: ArtificialIntelligenceChat | null;
    readonly userArtificialIntelligenceChats: ArtificialIntelligenceChat[] | null;
    readonly artificialIntelligenceChats: ArtificialIntelligenceChat[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: ArtificialIntelligenceChatState = {
    artificialIntelligenceChatId: null,
    singleArtificialIntelligenceChat: null,
    userArtificialIntelligenceChats: [],
    artificialIntelligenceChats: [],
    isLoading: false,
    error: null,
};

export const artificialIntelligenceChatReducer = (
    state = INITIAL_STATE, action: AnyAction
): ArtificialIntelligenceChatState => {
    if (
        artificialIntelligenceChatCreateStart.match(action) ||
        artificialIntelligenceChatUpdateStart.match(action) ||
        artificialIntelligenceChatDeleteStart.match(action) ||
        artificialIntelligenceChatFetchAllStart.match(action) ||
        artificialIntelligenceChatFetchSingleStart.match(action) ||
        artificialIntelligenceChatFetchUsersStart.match(action) ||
        artificialIntelligenceChatFetchOtherUsersStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        artificialIntelligenceChatUpdateSuccess.match(action) ||
        artificialIntelligenceChatDeleteSuccess.match(action) ||
        artificialIntelligenceChatFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, artificialIntelligenceChats: action.payload };
    } 
    if (
        artificialIntelligenceChatFetchUsersSuccess.match(action) ||
        artificialIntelligenceChatCreateSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userArtificialIntelligenceChats: action.payload };
    } 
    if (
        artificialIntelligenceChatFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleArtificialIntelligenceChat: action.payload };
    } 
    if (
        artificialIntelligenceChatCreateFailed.match(action) ||
        artificialIntelligenceChatUpdateFailed.match(action) ||
        artificialIntelligenceChatDeleteFailed.match(action) ||
        artificialIntelligenceChatFetchSingleFailed.match(action) ||
        artificialIntelligenceChatFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};
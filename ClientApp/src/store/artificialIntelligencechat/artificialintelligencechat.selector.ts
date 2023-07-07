import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ArtificialIntelligenceChatState } from './artificialintelligencechat.reducer';


export const selectArtificialIntelligenceChatReducer = (state: RootState): ArtificialIntelligenceChatState => state.artificialIntelligenceChat;

export const selectArtificialIntelligenceChatItems = createSelector(
    [selectArtificialIntelligenceChatReducer],
    (artificialintelligenceChat) => artificialintelligenceChat.artificialIntelligenceChats
);

export const selectArtificialIntelligenceChatId = createSelector(
    [selectArtificialIntelligenceChatReducer],
    (artificialintelligenceChat) => artificialintelligenceChat.artificialIntelligenceChatId
);

export const selectArtificialIntelligenceChatpost = createSelector(
    [selectArtificialIntelligenceChatReducer],
    (artificialintelligenceChat) => artificialintelligenceChat.singleArtificialIntelligenceChat
);

export const selectUserArtificialIntelligenceChat = createSelector(
    [selectArtificialIntelligenceChatReducer],
    (artificialintelligenceChat) => artificialintelligenceChat.userArtificialIntelligenceChats
);

export const selectAllArtificialIntelligenceChat = createSelector(
    [selectArtificialIntelligenceChatReducer],
    (artificialintelligenceChat) => artificialintelligenceChat.artificialIntelligenceChats
);
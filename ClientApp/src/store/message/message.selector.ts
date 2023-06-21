import { createSelector } from 'reselect';

import { RootState } from '../store';
import { MessageState } from './message.reducer';

export const selectMessageReducer = (state: RootState): MessageState => state.message;

export const selectMessageItems = createSelector(
    [selectMessageReducer],
    (message) => message.messages
);

export const selectMessageId = createSelector(
    [selectMessageReducer],
    (message) => message.messageId
);

export const selectSingleMessage = createSelector(
    [selectMessageReducer],
    (message) => message.singleMessage
);

export const selectUserMessages = createSelector(
    [selectMessageReducer],
    (message) => message.userMessages
);

export const selectAllMessages = createSelector(
    [selectMessageReducer],
    (message) => message.messages
);
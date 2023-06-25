import { all, call, put, takeLatest } from 'typed-redux-saga';

import { CHANNEL_ACTION_TYPES } from './channel.types';

import {
  addChannel,
  deleteChannel,
  editChannel,
  getChannels,
  getSingleChannel
} from '../../utils/api/channel.api';
import { ChannelCreateStart, ChannelDeleteStart, ChannelFetchAllStart, ChannelFetchSingleStart, ChannelFetchSingleSuccess, ChannelUpdateStart, channelCreateFailed, channelCreateSuccess, channelDeleteFailed, channelDeleteSuccess, channelFetchAllFailed, channelFetchAllStart, channelFetchAllSuccess, channelFetchSingleFailed, channelFetchSingleSuccess, channelUpdateFailed, channelUpdateSuccess } from './channel.action';

export function* createChannel({ payload: { description, communityId }}: ChannelCreateStart ) {
    try {
        const comments = yield* call(
            addChannel,
            description,
            communityId
        ); 
        yield* put(channelCreateSuccess(comments));
    } catch (error) {
        yield* put(channelCreateFailed(error as Error));
    }
}

export function* updateChannel({ payload: { channelId, description }}: ChannelUpdateStart) {
    try {
        const comment = yield* call(
            editChannel,
            channelId,
            description
        ); 
        yield* put(channelUpdateSuccess(comment));
    } catch (error) {
        yield* put(channelUpdateFailed(error as Error));
    }
}

export function* removeChannel({ payload: { channelId }}: ChannelDeleteStart) {
    try {
        const comments = yield* call(
            deleteChannel,
            channelId
        ); 
        yield* put(channelDeleteSuccess(comments));
    } catch (error) {
        yield* put(channelDeleteFailed(error as Error));
    }
}

export function* fetchSingleChannel({ 
    payload: { channelId } }: ChannelFetchSingleStart) {
    try {
        const channel = yield* call(
            getSingleChannel,
            channelId 
        );
        yield* put(channelFetchSingleSuccess(channel));
    } catch (error) {
        yield* put(channelFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChannels({ 
    payload: { communityId }}: ChannelFetchAllStart) {
    try {
        const comments = yield* call(
            getChannels,
            communityId
            );
        yield* put(channelFetchAllSuccess(comments));
    } catch (error) {
        yield* put(channelFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        CHANNEL_ACTION_TYPES.CREATE_START, 
        createChannel
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        CHANNEL_ACTION_TYPES.UPDATE_START, 
        updateChannel
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        CHANNEL_ACTION_TYPES.DELETE_START, 
        removeChannel
    );
}

export function* onFetchSingleStart() {
    yield* takeLatest(
        CHANNEL_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChannel
    );
}
  
export function* onFetchsStart() {
    yield* takeLatest(
        CHANNEL_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChannels
    );
}

export function* channelSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchSingleStart),
        call(onFetchsStart)
    ]);
}
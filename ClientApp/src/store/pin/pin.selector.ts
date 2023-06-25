import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PinState } from './pin.reducer';

export const selectPinReducer = (state: RootState): PinState => state.pin;

export const selectIsPinLoading = createSelector(
    [selectPinReducer],
    (pin) => pin.isLoading
);

export const selectPinId = createSelector(
    [selectPinReducer],
    (pin) => pin.pinId
);

export const selectSinglePin = createSelector(
    [selectPinReducer],
    (pin) => pin.singlePin
);

export const selectUserPins = createSelector(
    [selectPinReducer],
    (pin) => pin.userPins
);

export const selectAllPins = createSelector(
    [selectPinReducer],
    (pin) => pin.pins
);
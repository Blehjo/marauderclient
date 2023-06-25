import { createSelector } from 'reselect';

import { RootState } from '../store';
import { DeviceState } from './device.reducer';

export const selectDeviceReducer = (state: RootState): DeviceState => state.device;

export const selectIsDeviceLoading = createSelector(
    [selectDeviceReducer],
    (device) => device.isLoading
);

export const selectDeviceId = createSelector(
    [selectDeviceReducer],
    (device) => device.deviceId
);

export const selectSingleDevice = createSelector(
    [selectDeviceReducer],
    (device) => device.singleDevice
);

export const selectUserDevices = createSelector(
    [selectDeviceReducer],
    (device) => device.userDevices
);

export const selectAllDevices = createSelector(
    [selectDeviceReducer],
    (device) => device.devices
);
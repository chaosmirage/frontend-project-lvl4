import { createSlice, createSelector, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RootState } from 'app';
import _ from 'lodash';
import { Channel, messengerApi, Token } from 'shared/api';

export const DEFAULT_SELECTED_CHANNEL = 1;

export interface ChannelsState {
  channels: Channel[];
  currentChannelId: number;
}

const initialState: ChannelsState = {
  channels: [],
  currentChannelId: DEFAULT_SELECTED_CHANNEL,
};

export const addChannel = createAsyncThunk(
  'channelsDomain/addChannel',
  async (token: Token['token']) => {
    const response = await messengerApi.getData(token);
    return response.data;
  }
);

export const channelsSlice = createSlice({
  name: 'channelsDomain',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channels.push(...payload);
    },
    selectChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChannel.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const getChannels = (state: RootState) => state[channelsSlice.name];

export const getChannelsSelector = createSelector(
  getChannels,
  (channelsState) => channelsState.channels
);

export const getCurrentChannelSelector = createSelector(
  getChannels,
  (channelsState: ChannelsState) => {
    return channelsState.channels.find((channel) => channel.id === channelsState.currentChannelId);
  }
);

export const { addChannels, selectChannel } = channelsSlice.actions;

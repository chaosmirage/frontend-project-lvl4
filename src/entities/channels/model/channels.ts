import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
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
    deleteChannel(state, { payload: channelId }) {
      state.channels = state.channels.filter(({ id }) => id !== channelId);
    },
    renameChannel(state, { payload: { id, name } }: { payload: Channel }) {
      state.channels = state.channels.reduce((acc, channel) => {
        if (channel.id === id) {
          acc.push({ ...channel, name });

          return acc;
        }

        acc.push(channel);

        return acc;
      }, [] as Channel[]);
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

export const getChannelsNamesSelector = createSelector(getChannels, (channelsState) =>
  channelsState.channels.map(({ name }) => name)
);

export const getCurrentChannelSelector = createSelector(
  getChannels,
  (channelsState: ChannelsState) => {
    return channelsState.channels.find((channel) => channel.id === channelsState.currentChannelId);
  }
);

export const { addChannels, selectChannel, deleteChannel, renameChannel } = channelsSlice.actions;

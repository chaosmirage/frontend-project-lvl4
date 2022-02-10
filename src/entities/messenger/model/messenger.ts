import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app';
import _ from 'lodash';
import { Channel, Message, messengerApi, Token } from 'shared/api';

export const DEFAULT_SELECTED_CHANNEL = 1;

interface MessengerState {
  data: {
    messages: Message[];
    channels: Channel[];
    currentChannelId: number;
  };
  errors: null;
}

const initialState: MessengerState = {
  data: {
    messages: [],
    channels: [],
    currentChannelId: DEFAULT_SELECTED_CHANNEL,
  },
  errors: null,
};

export const getData = createAsyncThunk('messenger/getData', async (token: Token['token']) => {
  const response = await messengerApi.getData(token);
  return response.data;
});

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

const getMessengerData = (state: RootState) => state[messengerSlice.name].data;

export const messengerDataSelector = createSelector(getMessengerData, _.identity);

export const getMessagesSelector = createSelector(getMessengerData, (state) => {
  return state.messages;
});

export const getChannelsSelector = createSelector(getMessengerData, (state) => {
  return state.channels;
});

export const getCurrentChannelSelector = createSelector(
  getMessengerData,
  (state: MessengerState['data']) => {
    return state.channels.find((channel) => channel.id === state.currentChannelId);
  }
);

export const getCurrentChannelMessagesSelector = createSelector(
  getMessengerData,
  (state: MessengerState['data']) => {
    return state.messages.filter((message) => message.channelId === state.currentChannelId);
  }
);

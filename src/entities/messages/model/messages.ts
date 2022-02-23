import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app';
import _ from 'lodash';
import { Message, messengerApi, Token } from 'shared/api';

export const DEFAULT_SELECTED_CHANNEL = 1;

export interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

export const addMessage = createAsyncThunk(
  'messagesDomain/addMessage',
  async (token: Token['token']) => {
    const response = await messengerApi.getData(token);
    return response.data;
  }
);

export const messagesSlice = createSlice({
  name: 'messagesDomain',
  initialState,
  reducers: {
    setInitialMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessages(state, { payload }) {
      state.messages.push(...payload);
    },
    deleteMessagesByChannel(state, { payload: id }) {
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const getMessages = (state: RootState) => state[messagesSlice.name];

export const messengerDataSelector = createSelector(getMessages, _.identity);

export const getMessagesSelector = createSelector(getMessages, (state) => {
  return state.messages;
});

export const { addMessages, deleteMessagesByChannel, setInitialMessages } = messagesSlice.actions;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Messenger, messengerApi, Token } from 'shared/api';

export const getData = createAsyncThunk('messenger/getData', async (token: Token['token']) => {
  const response = await messengerApi.getData(token);
  return response.data as Messenger;
});

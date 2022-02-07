import { createContext, useContext } from 'react';

import { channelsApi, Token } from 'shared/api';

export const channel = () => {
  return {
    getAll: async (token: Token['token']) => {
      const { data } = await channelsApi.getAll(token);

      return data;
    },
  };
};

export type Channel = ReturnType<typeof channel>;

export const ChannelContext = createContext<Channel>(channel());

export const useChannel = () => useContext(ChannelContext);

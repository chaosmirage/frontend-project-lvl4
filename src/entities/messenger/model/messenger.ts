import { createContext, useContext } from 'react';

import { Channel, Message, messengerApi, Token } from 'shared/api';

export const messenger = () => {
  let messages: Message[] = [];
  let channels: Channel[] = [];
  let currentChannelId = 1;

  return {
    getData: async (token: Token['token']) => {
      const { data } = await messengerApi.getData(token);

      messages = data.messages;
      channels = data.channels;
      currentChannelId = data.currentChannelId;

      return data;
    },
    getMessages: () => messages,
    getChannels: () => channels,
    getCurrentChannelId: () => currentChannelId,
    getCurrentChannel: (channelId: number) => {
      return channels.find((channel) => channel.id === channelId);
    },
    getCurrentChannelMessages: (channelId: number) => {
      return messages.filter((message) => message.channelId === channelId);
    },
  };
};

export type Messenger = ReturnType<typeof messenger>;

export const MessengerContext = createContext<Messenger>(messenger());

export const useMessenger = () => useContext(MessengerContext);

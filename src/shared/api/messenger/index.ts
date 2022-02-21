import type { AxiosPromise } from 'axios';
import { makeRequest, makeSocketConnection } from '../../lib';
import type { Messenger, Token, Message, Channel } from '../models';

const BASE_URL = '/data';

export const getData = (token: Token['token']): AxiosPromise<Messenger> => {
  return makeRequest.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const makeMessagesConnection = () => {
  const socketConnection = makeSocketConnection();

  return {
    sendMessage: (
      message: Omit<Message, 'id'>,
      handler?: (response: { status: string }) => void
    ) => {
      socketConnection.emit('newMessage', message, handler);
    },
    addChannel: (
      message: Omit<Channel, 'id'>,
      handler?: (response: { status: string; data: Channel }) => void
    ) => {
      socketConnection.emit('newChannel', message, handler);
    },
    handleConnect: (handler: (socket: typeof socketConnection) => void) => {
      socketConnection.on('connect', () => handler(socketConnection));
    },
    handleDisconnect: (handler: (reason: string) => void) => {
      socketConnection.on('disconnect', handler);
    },
    handleNewMessage: (handler: (message: Message) => void) => {
      socketConnection.on('newMessage', handler);
    },
    handleNewChannel: (handler: (channel: Channel) => void) => {
      socketConnection.on('newChannel', handler);
    },
  };
};

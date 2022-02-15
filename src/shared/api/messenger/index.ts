import type { AxiosPromise } from 'axios';
import { makeRequest, makeSocketConnection } from '../../lib';
import type { Messenger, Token, Message } from '../models';

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
    sendMessage: (message: Omit<Message, 'id'>) => {
      socketConnection.emit('newMessage', message);
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
  };
};

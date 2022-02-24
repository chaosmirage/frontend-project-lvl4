import { createContext } from 'react';
import type { AxiosPromise } from 'axios';
import { makeRequest, makeSocketConnection, SocketConnection } from '../../lib';
import type { Messenger, Token, Message, Channel } from '../models';

const BASE_URL = '/data';

export const getData = (token: Token['token']): AxiosPromise<Messenger> => {
  return makeRequest.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type EmitEventTypes = 'newChannel' | 'removeChannel' | 'newMessage' | 'renameChannel';
type HandleEventTypes = 'connect' | 'disconnect' | EmitEventTypes;

export const makeMessagesConnection = (socketConnection: SocketConnection) => {
  return {
    disconnect: () => {
      socketConnection.disconnect();
    },
    sendMessage: (
      message: Omit<Message, 'id'>,
      handler?: (response: { status: string }) => void
    ) => {
      socketConnection.emit<EmitEventTypes>('newMessage', message, handler);
    },
    addChannel: (
      channel: Omit<Channel, 'id'>,
      handler?: (response: { status: string; data: Channel }) => void
    ) => {
      socketConnection.emit<EmitEventTypes>('newChannel', channel, handler);
    },
    deleteChannel: (
      channel: Pick<Channel, 'id'>,
      handler?: (response: { status: string }) => void
    ) => {
      socketConnection.emit<EmitEventTypes>('removeChannel', channel, handler);
    },
    renameChannel: (
      channel: Omit<Channel, 'removable'>,
      handler?: (response: { status: string }) => void
    ) => {
      socketConnection.emit<EmitEventTypes>('renameChannel', channel, handler);
    },
    handleConnect: (handler: (socket: typeof socketConnection) => void) => {
      socketConnection.on<HandleEventTypes>('connect', () => handler(socketConnection));
    },
    handleDisconnect: (handler: (reason: string) => void) => {
      socketConnection.on<HandleEventTypes>('disconnect', handler);
    },
    handleNewMessage: (handler: (message: Message) => void) => {
      socketConnection.on<HandleEventTypes>('newMessage', handler);
    },
    handleNewChannel: (handler: (channel: Channel) => void) => {
      socketConnection.on<HandleEventTypes>('newChannel', handler);
    },
    handleDeletedChannel: (handler: (channel: Pick<Channel, 'id'>) => void) => {
      socketConnection.on<HandleEventTypes>('removeChannel', handler);
    },
    handleRenamedChannel: (handler: (channel: Channel) => void) => {
      socketConnection.on<HandleEventTypes>('renameChannel', handler);
    },
  };
};

export const MessagesConnectionContext = createContext<ReturnType<typeof makeMessagesConnection>>(
  makeMessagesConnection(makeSocketConnection())
);

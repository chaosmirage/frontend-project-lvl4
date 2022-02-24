import { io } from 'socket.io-client';

export const makeSocketConnection = () => io();

export type SocketConnection = ReturnType<typeof makeSocketConnection>;

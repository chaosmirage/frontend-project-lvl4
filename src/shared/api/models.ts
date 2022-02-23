export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export type User = Token & Pick<Credentials, 'username'>;

export interface Channel {
  id: number;
  name: string;
  removable: boolean;
}

export interface Message {
  body: string;
  channelId: number;
  id: number;
  username: string;
}

export interface Messenger {
  channels: Channel[];
  messages: Message[];
  currentChannelId: number;
}

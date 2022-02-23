const HOST = '';
export const API_URL = '/api/v1';

export const pageRoutes = {
  login: () => [HOST, 'login'].join('/'),
  signUp: () => [HOST, 'signup'].join('/'),
  root: () => '/',
};

export const apiRoutes = {
  login: () => [HOST, 'login'].join('/'),
  signUp: () => [HOST, 'signup'].join('/'),
  channels: () => [HOST, 'channels'].join('/'),
  channel: (id: number) => [HOST, 'channels', id].join('/'),
  channelMessages: (id: number) => [HOST, 'channels', id, 'messages'].join('/'),
};

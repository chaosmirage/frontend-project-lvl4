import { signUpApi, Credentials, loginApi, User } from 'shared/api';

export const GUEST: User = {
  username: 'guest',
  token: '',
};

export const guest = {
  signUp: async (credentials: Credentials) => {
    const { data } = await signUpApi(credentials);

    return data;
  },
  logIn: async (credentials: Credentials) => {
    const { data } = await loginApi(credentials);

    return data;
  },
};

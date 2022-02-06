import { createContext, useContext } from 'react';

import { authApi, Credentials } from 'shared/api';

const TOKEN_KEY = 'TOKEN_KEY';

export const auth = () => {
  let isLoggedIn = false;

  if (localStorage.getItem(TOKEN_KEY)) {
    isLoggedIn = true;
  }

  return {
    logIn: async (credentials: Credentials) => {
      const {
        data: { token },
      } = await authApi(credentials);

      localStorage.setItem(TOKEN_KEY, token);
      isLoggedIn = true;
    },
    logOut: () => {
      localStorage.removeItem(TOKEN_KEY);
      isLoggedIn = false;
    },
    isLoggedIn: () => isLoggedIn,
  };
};

export type Auth = ReturnType<typeof auth>;

export const AuthContext = createContext<Auth>(auth());

export const useAuth = () => useContext(AuthContext);

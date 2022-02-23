import React, { createContext, ReactNode, useContext, useState } from 'react';
import type { FC } from 'react';

import { GUEST } from 'entities/guest';
import { User } from 'shared/api';
import _ from 'lodash';

type Auth = {
  logIn: (userData: User) => void;
  logOut: () => void;
  user: User;
};

export const AuthContext = createContext<Auth>({
  logIn: _.noop,
  logOut: _.noop,
  user: GUEST,
});

export const useAuth = () => useContext(AuthContext);

const getUserData = () => {
  const storageData = localStorage.getItem('user');

  if (storageData === null) {
    return GUEST;
  }

  return JSON.parse(storageData);
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, changeUser] = useState<Auth['user']>(getUserData());

  const logIn: Auth['logIn'] = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    changeUser(userData);
  };

  const logOut: Auth['logOut'] = () => {
    localStorage.removeItem('user');
    changeUser(GUEST);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

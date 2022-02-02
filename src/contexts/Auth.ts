import { createContext } from 'react';

const AuthContext = createContext<{
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}>({ isLoggedIn: false, logIn: () => null, logOut: () => null });

export default AuthContext;

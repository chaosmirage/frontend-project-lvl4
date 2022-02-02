import React, { useState, ReactElement, useLayoutEffect } from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';

import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import AuthContext from './contexts/Auth';
import useAuth from './hooks/useAuth';

const TOKEN_KEY = 'APP_KEY';

const hasToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

i18n.use(initReactI18next).init({
  resources: ru,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

const PrivateRoute: FC<{ children?: ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn && children) {
    return children;
  }

  return <Navigate to="/login" />;
};

const App: FC = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div>main</div>
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default () => {
  render(<App />, document.getElementById('root'));
};

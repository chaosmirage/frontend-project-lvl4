import React, { useEffect } from 'react';
import type { FC } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  Provider as ReduxProvider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'react-toastify/dist/ReactToastify.css';
import '../../assets/application.scss';

import { Routing } from 'pages';
import { AuthProvider } from 'features/auth';
import { messagesSlice } from 'entities/messages';
import { channelsSlice } from 'entities/channels';
import { rollbarConfig } from 'shared/config';
import { makeMessagesConnection, MessagesConnectionContext } from 'shared/api/messenger';
import { makeSocketConnection } from 'shared/lib';
import ru from './locales/ru.json';

i18n.use(initReactI18next).init({
  resources: ru,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export const store = configureStore({
  reducer: combineReducers({
    messagesDomain: messagesSlice.reducer,
    channelsDomain: channelsSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const makeApp = (socketConnection = makeSocketConnection()) => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <MessagesConnectionContext.Provider value={makeMessagesConnection(socketConnection)}>
          <ReduxProvider store={store}>
            <AuthProvider>
              <div className="d-flex flex-column h-100">
                <Routing />
              </div>
              <ToastContainer />
            </AuthProvider>
          </ReduxProvider>
        </MessagesConnectionContext.Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

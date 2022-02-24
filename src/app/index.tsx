import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import {
  Provider as ReduxProvider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
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
import en from './locales/en.json';

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

const makeApp = async (socketConnection = makeSocketConnection()) => {
  const i18Instance = i18n.createInstance();
  return i18Instance
    .use(initReactI18next)
    .init({
      resources: { ru, en },
      lng: 'ru',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
    .then(() => (
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ReduxProvider store={store}>
            <I18nextProvider i18n={i18Instance}>
              <MessagesConnectionContext.Provider value={makeMessagesConnection(socketConnection)}>
                <AuthProvider>
                  <div className="d-flex flex-column h-100">
                    <Routing />
                  </div>
                  <ToastContainer autoClose={7000} />
                </AuthProvider>
              </MessagesConnectionContext.Provider>
            </I18nextProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </RollbarProvider>
    ));
};

export default makeApp;

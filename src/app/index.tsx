import React, { useState } from 'react';
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

import '../../assets/application.scss';

import { Routing } from 'pages';
import { AuthContext, makeAuthModel } from 'features/auth';
import { messagesSlice } from 'entities/messages';
import { channelsSlice } from 'entities/channels';
import { Nav } from 'shared/ui/Nav';
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

export const App: FC = () => {
  const [authModel] = useState(makeAuthModel());

  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={authModel}>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routing />
        </div>
      </AuthContext.Provider>
    </ReduxProvider>
  );
};

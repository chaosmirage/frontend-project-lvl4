import React, { useState } from 'react';
import type { FC } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import '../../assets/application.scss';

import { Routing } from 'pages';
import { AuthContext, makeAuthModel } from 'features/auth';
import { MessengerContext, makeMessengerModel } from 'entities/messenger/model';
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

export const App: FC = () => {
  const [authModel] = useState(makeAuthModel());
  const [messengerModel] = useState(makeMessengerModel());

  return (
    <AuthContext.Provider value={authModel}>
      <MessengerContext.Provider value={messengerModel}>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routing />
        </div>
      </MessengerContext.Provider>
    </AuthContext.Provider>
  );
};

import React, { useState } from 'react';
import type { FC } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import '../../assets/application.scss';

import ru from './locales/ru.json';
import { Routing } from 'pages';
import { AuthContext, makeAuthModel } from 'features/auth';
import { ChannelContext, makeChannelModel } from 'entities/channel/model';
import { Nav } from 'shared/ui/Nav';

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
  const [channelModel] = useState(makeChannelModel());

  return (
    <AuthContext.Provider value={authModel}>
      <ChannelContext.Provider value={channelModel}>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routing />
        </div>
      </ChannelContext.Provider>
    </AuthContext.Provider>
  );
};

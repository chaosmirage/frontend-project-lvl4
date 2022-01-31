import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Nav: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('appName')}
        </a>
      </div>
    </div>
  );
};

export default Nav;

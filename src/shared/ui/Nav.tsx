import React, { ReactNode } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pageRoutes } from 'shared/config';

interface Props {
  logoutButton: ReactNode;
}

export const Nav: FC<Props> = ({ logoutButton }) => {
  const { t } = useTranslation();
  return (
    <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={pageRoutes.root()} className="navbar-brand">
          {t('appName')}
        </Link>
        {logoutButton}
      </div>
    </div>
  );
};

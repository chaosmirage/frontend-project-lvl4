import React from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'features/auth';
import { Nav } from 'shared/ui';
import { Button } from 'react-bootstrap';
import { GUEST } from 'entities/guest';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();

  return (
    <>
      <Nav
        logoutButton={user !== GUEST && <Button onClick={logOut}>{t('navPanel.logout')}</Button>}
      />
      {children}
    </>
  );
};

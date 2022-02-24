import React, { ReactNode } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  logoutButton: ReactNode;
}

export const Nav: FC<Props> = ({ logoutButton }) => {
  const { t } = useTranslation();
  return (
    <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {logoutButton}
      </div>
    </div>
  );
};

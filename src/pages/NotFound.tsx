import React from 'react';
import type { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const NotFound: FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('errors.pageNotFound')}
        className="img-fluid"
        src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png"
      />
      <h1 className="h4 text-muted">{t('errors.pageNotFound')}</h1>
      <p className="text-muted">
        <Trans i18nKey="notFoundPage.goToMainPage" components={{ linkto: <a href="/" /> }} />
      </p>
    </div>
  );
};

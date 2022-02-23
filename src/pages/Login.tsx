import React from 'react';
import type { FC } from 'react';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { LoginForm } from 'features/auth/ui/LoginForm';
import { Credentials } from 'shared/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Login: FC<Props> = () => {
  const { t } = useTranslation();

  const { logIn, logOut } = useAuth();

  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: Credentials,
    { setErrors, setSubmitting }: FormikHelpers<Credentials>
  ) => {
    try {
      await logIn(values);
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setErrors({ password: t('errors.invalidUserNameOrPassword') });
        logOut();
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-sm-8 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <LoginForm onSubmit={handleFormSubmit} />
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('loginPage.dontHaveAcc')}</span>{' '}
              <a href="/signup">{t('loginPage.actions.registration')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

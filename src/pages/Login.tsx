import React from 'react';
import type { FC } from 'react';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { LoginForm } from 'features/auth/ui/LoginForm';
import { Credentials } from 'shared/api';
import { pageRoutes } from 'shared/config';
import { guestModel } from 'entities/guest';

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
      const user = await guestModel.logIn(values);
      logIn(user);

      navigate(pageRoutes.root());
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
              <Link to={pageRoutes.signUp()}>{t('loginPage.actions.registration')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

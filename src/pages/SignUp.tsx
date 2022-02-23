import React from 'react';
import type { FC } from 'react';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { SignUpForm } from 'features/auth/ui/SignUpForm';
import type { FormCredentials } from 'features/auth/ui/SignUpForm';
import { guestModel } from 'entities/guest';
import { pageRoutes } from 'shared/config';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const SignUp: FC<Props> = () => {
  const { t } = useTranslation();

  const { logIn } = useAuth();

  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: FormCredentials,
    { setErrors, setSubmitting }: FormikHelpers<FormCredentials>
  ) => {
    try {
      const user = await guestModel.signUp(values);
      logIn(user);
      navigate(pageRoutes.root());
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        setErrors({ username: t('errors.userAlreadyExist') });
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
              <SignUpForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

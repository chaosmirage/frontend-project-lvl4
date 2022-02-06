import React from 'react';
import type { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { makeCredentialsSchema } from '../model';
import type { Credentials } from '../../../shared/api';

interface Props {
  onSubmit: (data: Credentials, actions: FormikHelpers<Credentials>) => void;
}

export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={makeCredentialsSchema(t)}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
          <Form.Group className="mb-3" controlId="validationFormikUsername2">
            <Form.FloatingLabel label={t('loginPage.loginForm.username')}>
              <Form.Control
                type="text"
                placeholder={t('loginPage.loginForm.username')}
                aria-describedby="inputGroupPrepend"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.username || !!errors.password}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              )}
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationFormikUsername2">
            <Form.FloatingLabel label={t('loginPage.loginForm.password')}>
              <Form.Control
                type="password"
                placeholder={t('loginPage.loginForm.password')}
                aria-describedby="inputGroupPrepend"
                name="password"
                autoComplete="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.FloatingLabel>
          </Form.Group>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            {t('loginPage.loginForm.submit')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

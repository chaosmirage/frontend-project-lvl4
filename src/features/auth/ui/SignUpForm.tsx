import React from 'react';
import type { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { makeSignUpSchema } from '../model';
import type { Credentials } from '../../../shared/api';

export type FormCredentials = Credentials & { confirmPassword: string };

interface Props {
  onSubmit: (data: FormCredentials, actions: FormikHelpers<FormCredentials>) => void;
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={makeSignUpSchema(t)}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
          <Form.Group className="mb-3" controlId="username">
            <Form.FloatingLabel controlId="username" label={t('signUpPage.signUpForm.username')}>
              <Form.Control
                type="text"
                placeholder={t('signUpPage.signUpForm.username')}
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
          <Form.Group className="mb-3" controlId="password">
            <Form.FloatingLabel controlId="password" label={t('signUpPage.signUpForm.password')}>
              <Form.Control
                type="password"
                placeholder={t('signUpPage.signUpForm.password')}
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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.FloatingLabel
              controlId="confirmPassword"
              label={t('signUpPage.signUpForm.confirmPassword')}
            >
              <Form.Control
                type="password"
                placeholder={t('signUpPage.signUpForm.confirmPassword')}
                aria-describedby="inputGroupPrepend"
                name="confirmPassword"
                autoComplete="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.FloatingLabel>
          </Form.Group>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            {t('signUpPage.actions.signUp')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

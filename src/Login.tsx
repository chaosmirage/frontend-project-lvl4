/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import useAuth from './hooks/useAuth';
import makeRequest from './lib/makeRequest';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Login: FC<Props> = () => {
  const { t } = useTranslation();

  const { logIn } = useAuth();

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.requiredField')),
    password: Yup.string().required(t('errors.requiredField')),
  });

  const handleFormSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      const {
        data: { token },
      } = await makeRequest.post('/api/v1/login', values);

      localStorage.setItem('APP_KEY', token);

      logIn();

      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setErrors({ password: t('errors.invalidUserNameOrPassword') });
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleFormSubmit}
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
                          type="text"
                          placeholder={t('loginPage.loginForm.password')}
                          aria-describedby="inputGroupPrepend"
                          name="password"
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

export default Login;

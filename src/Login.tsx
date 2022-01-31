/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation, initReactI18next } from 'react-i18next';

interface Props {}

const Login: FC<Props> = () => {
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.requiredField')),
    password: Yup.string().required(t('errors.requiredField')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 500);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form className="col-12" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                    <div className="form-floating mb-3 form-group">
                      <input
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('loginPage.loginForm.username')}
                        id="username"
                        className="form-control"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="username">{t('loginPage.loginForm.username')}</label>
                      {errors.username && touched.username && errors.username}
                    </div>
                    <div className="form-floating mb-4 form-group">
                      <input
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('loginPage.loginForm.password')}
                        type="password"
                        id="password"
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label className="form-label" htmlFor="password">
                        {t('loginPage.loginForm.password')}
                      </label>
                      {errors.password && touched.password && errors.password}
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                    >
                      {t('loginPage.loginForm.submit')}
                    </button>
                  </form>
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

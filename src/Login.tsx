/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface Props {}

const Login: FC<Props> = () => {
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
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3 form-group">
                      <input
                        name="username"
                        autoComplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        className="form-control"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="username">Ваш ник</label>
                      {errors.username && touched.username && errors.username}
                    </div>
                    <div className="form-floating mb-4 form-group">
                      <input
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                      {errors.password && touched.password && errors.password}
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                    >
                      Войти
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

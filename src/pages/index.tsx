import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pageRoutes } from 'shared/config';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { NotFound } from './NotFound';
import { AccessGuard } from './AccessGuard';
import { Messenger } from './Messenger';
import { Layout } from './Layout';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={pageRoutes.root()}
          element={
            <AccessGuard>
              <Layout>
                <Messenger />
              </Layout>
            </AccessGuard>
          }
        />
        <Route
          path={pageRoutes.login()}
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path={pageRoutes.signUp()}
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

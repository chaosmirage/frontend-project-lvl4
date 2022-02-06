import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { AccessGuard } from './AccessGuard';
import { useAuth } from 'features/auth';

export const Routing = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AccessGuard>
              <div>main</div>
            </AccessGuard>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

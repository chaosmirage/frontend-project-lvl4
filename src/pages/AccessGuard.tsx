import React from 'react';
import type { FC, ReactElement } from 'react';
import { useAuth } from 'features/auth';
import { Navigate } from 'react-router-dom';

export const AccessGuard: FC<{ children?: ReactElement }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn() && children) {
    return children;
  }

  return <Navigate to="/login" />;
};

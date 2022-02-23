import React from 'react';
import type { FC, ReactNode } from 'react';
import { useAuth } from 'features/auth';
import { Navigate } from 'react-router-dom';
import { GUEST } from 'entities/guest';

export const AccessGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user !== GUEST) {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

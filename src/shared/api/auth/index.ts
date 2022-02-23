import type { AxiosPromise } from 'axios';
import { apiRoutes } from 'shared/config';
import { makeRequest } from '../../lib';
import type { Credentials, User } from '../models';

export const login = (credentials: Credentials): AxiosPromise<User> => {
  return makeRequest.post(apiRoutes.login(), credentials);
};

export const signUp = (credentials: Credentials): AxiosPromise<User> => {
  return makeRequest.post(apiRoutes.signUp(), credentials);
};

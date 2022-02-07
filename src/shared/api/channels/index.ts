import type { AxiosPromise } from 'axios';
import { makeRequest } from '../../lib';
import type { App, Token } from '../models';

const BASE_URL = '/data';

export const getAll = (token: Token['token']): AxiosPromise<App> => {
  return makeRequest.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

import type { AxiosPromise } from 'axios';
import { makeRequest } from '../../lib';
import type { Messenger, Token } from '../models';

const BASE_URL = '/data';

export const getData = (token: Token['token']): AxiosPromise<Messenger> => {
  return makeRequest.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

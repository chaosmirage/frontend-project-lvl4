import type { AxiosPromise } from 'axios';
import { makeRequest } from '../../lib';
import type { Credentials, Token } from '../models';

const BASE_URL = '/login';

export const auth = (credentials: Credentials): AxiosPromise<Token> => {
  return makeRequest.post(`${BASE_URL}`, credentials);
};

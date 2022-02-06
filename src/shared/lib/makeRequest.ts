import axios from 'axios';
import { API_URL } from 'shared/config';

export const makeRequest = axios.create({ baseURL: API_URL });

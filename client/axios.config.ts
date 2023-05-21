import axios, { AxiosError, AxiosResponse } from 'axios';
import { errorRes } from './lib/api/api-responses';
import { getToken } from './lib/utilities/localStorage';

export const baseHttp = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const authHttp = axios.create({
  baseURL: 'http://localhost:3001/api/auth',
});

baseHttp.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    const config = error.config;

    return Promise.reject(error);
  }
);

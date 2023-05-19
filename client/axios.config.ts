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

    if (error.response?.status === 401) {
      errorRes('Session expired');
      window.location.replace('/auth');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

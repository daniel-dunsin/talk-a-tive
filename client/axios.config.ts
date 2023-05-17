import axios from 'axios';

export const baseHttp = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const authHttp = axios.create({
  baseURL: 'http://localhost:3001/api/auth',
});

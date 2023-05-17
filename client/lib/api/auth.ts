import { authHttp } from '@/axios.config';
import { AxiosError } from 'axios';
import { ILogin, IRegister } from '../types/api.types';
import { storeUser } from '../utilities/localStorage';
import { errorRes, loadingRes, successRes } from './api-responses';

export const register = async (details: IRegister) => {
  const formData = new FormData();

  formData.append('username', details.username);
  formData.append('email', details.email);
  formData.append('password', details.password);
  formData.append('confirmPassword', details.confirmPassword);
  formData.append('dp', details.dp);

  loadingRes('Creating your account...');

  try {
    const { data } = await authHttp.post('/register', formData);

    storeUser(data?.user);

    successRes('Account Created');

    return data?.user;
  } catch (error: any) {
    errorRes(error);
  }
};

export const login = async (data: ILogin) => {
  try {
    const res = await authHttp.post('/login', data);

    storeUser(res.data?.user);
    successRes('Log in Successful');

    return res.data?.user;
  } catch (error: any) {
    errorRes(error);
  }
};

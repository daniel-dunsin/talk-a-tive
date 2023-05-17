import { IUser } from '../types/states.types';

export const storeUser = (user: IUser): void => {
  !!window && localStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => {
  const token: string =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('user') as string)?.token;
};

export const getUser = () => {
  const user =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('user') as string);
};

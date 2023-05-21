import { IUser } from './states.types';

export interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  dp: File | string;
}

export interface ILogin {
  detail: string;
  password: string;
}

export interface ICreateGroup {
  users: IUser[];
  name: string;
}

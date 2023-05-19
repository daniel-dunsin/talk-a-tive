import { baseHttp } from '@/axios.config';
import { IUser } from '../types/states.types';
import { errorRes, loadingRes } from './api-responses';

export const getUsers = async (search: string) => {
  try {
    const response = await baseHttp.get(`/auth/users?search=${search}`);

    return response.data?.users as IUser[];
  } catch (error: any) {
    errorRes(error);
  }
};

export const openChat = async (friendId: string) => {
  try {
    const response = await baseHttp.post('/chat/access-chat', { friendId });

    loadingRes('Opening Chat');

    return response.data?.chat;
  } catch (error: any) {
    errorRes(error);
  }
};

export const getChats = async () => {
  try {
    const response = await baseHttp.get('/chat');

    return response.data?.chats;
  } catch (error: any) {
    errorRes(error);
  }
};

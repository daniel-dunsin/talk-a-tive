import { baseHttp } from '@/axios.config';
import { ICreateGroup } from '../types/api.types';
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

export const createGroup = async (group: ICreateGroup) => {
  try {
    const response = await baseHttp.post('/chat/group', group);

    return response.data?.group;
  } catch (error: any) {
    errorRes(error);
  }
};

export const editGroup = async (group: ICreateGroup, id: string) => {
  try {
    const response = await baseHttp.put(`/chat/group/${id}`, group);

    return response?.data?.group;
  } catch (error: any) {
    errorRes(error);
  }
};

export const leaveGroup = async (id: string) => {
  try {
    const response = await baseHttp.patch(`/chat/group/${id}`);

    return response?.data?.group;
  } catch (error: any) {
    errorRes(error);
  }
};

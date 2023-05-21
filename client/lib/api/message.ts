import { baseHttp } from '@/axios.config';
import { errorRes } from './api-responses';

export const sendMessage = async (text: string, chatId: string) => {
  try {
    const response = await baseHttp.post('/message/' + chatId, { text });

    return response?.data?.message;
  } catch (error: any) {
    errorRes(error);
  }
};

export const getAllMessages = async (chatId: string) => {
  try {
    const response = await baseHttp.get('/message/' + chatId);

    return response?.data?.messages;
  } catch (error: any) {
    errorRes(error);
  }
};

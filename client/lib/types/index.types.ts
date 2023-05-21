import { Dispatch, SetStateAction } from 'react';
import { IChat, IUser } from './states.types';

export interface IAppContext {
  user: IUser;
  loadingChat: boolean;
  setLoadingChat: Dispatch<SetStateAction<boolean>>;
  openedChat: IChat | null;
  setOpenedChat: Dispatch<SetStateAction<IChat | null>>;
  chats: IChat[];
  setChats: Dispatch<SetStateAction<IChat[]>>;
}

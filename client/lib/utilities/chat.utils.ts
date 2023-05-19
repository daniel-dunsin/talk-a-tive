import { IChat, IUser } from '../types/states.types';

export const getChatMate = (chat: IChat, user: IUser): IUser => {
  return (chat.users as IUser[])?.find(
    (singleUser: IUser) => singleUser.username !== user.username
  ) as IUser;
};

import { IChat, IMessage, IUser } from '../types/states.types';

export const getChatMate = (chat: IChat, user: IUser): IUser => {
  return (chat.users as IUser[])?.find(
    (singleUser: IUser) => singleUser.username !== user.username
  ) as IUser;
};

// if the owner of the current message is the owner of the next set of messages, display their avatar only once
export const ownsPreviousMessage = (
  messages: IMessage[],
  index: number
): boolean => {
  if (index === 0) {
    return true;
  } else {
    if (messages[index - 1].sender._id !== messages[index].sender._id) {
      return true;
    } else {
      return false;
    }
  }
};

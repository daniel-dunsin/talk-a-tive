export interface IUser {
  email: string;
  username: string;
  dp: string;
  _id: string;
  _v: number;
}

export interface IMessage {
  sender: IUser;
  text: string;
  chat: IChat;
  _id: string;
}

export interface IChat {
  name: string;
  isGroupChat: boolean;
  users: IUser[] | string[];
  latestMessage: IMessage;
  groupAdmin: IUser;
  _id: string;
}

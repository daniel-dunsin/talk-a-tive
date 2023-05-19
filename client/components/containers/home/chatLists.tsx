import ContentBox, { ContentBoxWithHeader } from '@/components/ui/contentBox';
import SingleChat from '@/components/ui/singleChat';
import UsersContainer from '@/components/ui/usersContainer';
import { getChats } from '@/lib/api/chat';
import { useGlobalContext } from '@/lib/context';
import { IChat, IUser } from '@/lib/types/states.types';
import { getChatMate } from '@/lib/utilities/chat.utils';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';

interface ChatListProps {
  setOpenedLayer: Dispatch<SetStateAction<'ChatList' | 'ChatRoom'>>;
}

const ChatsList = (props: ChatListProps) => {
  const [chats, setChats] = useState<IChat[]>([]);

  const fetchChats = async () => {
    const chats = await getChats();
    setChats(chats);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ContentBoxWithHeader
      size='md'
      styles='w-full col-span-1'
      itemRight={
        <button className='flex items-center space-x-3 justify-center px-4 py-1 bg-[#f0f0f0] rounded-md'>
          <span>
            <BiPlus />
          </span>
          New Group
        </button>
      }
      text='My Chats'
    >
      <div className='flex flex-col space-y-4'>
        {chats?.map((chat) => {
          return (
            <SingleChat
              key={chat._id}
              chat={chat}
              setOpenedLayer={props?.setOpenedLayer}
            />
          );
        })}
      </div>
    </ContentBoxWithHeader>
  );
};

export default ChatsList;

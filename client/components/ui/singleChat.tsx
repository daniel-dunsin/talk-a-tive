import { useGlobalContext } from '@/lib/context';
import { IChat } from '@/lib/types/states.types';
import { getChatMate } from '@/lib/utilities/chat.utils';
import React, { Dispatch, SetStateAction } from 'react';
import ContentBox from './contentBox';

interface SingleChatProps {
  setOpenedLayer: Dispatch<SetStateAction<'ChatList' | 'ChatRoom'>>;
  chat: IChat;
}

const SingleChat = (props: SingleChatProps) => {
  const { user, setOpenedChat, openedChat } = useGlobalContext();

  // Use for only non-group chats
  const chatMate = getChatMate(props?.chat, user);

  return (
    <ContentBox
      size='sm'
      styles={`${
        openedChat?._id === props?.chat?._id
          ? 'bg-[royalblue] !text-white'
          : 'bg-[#f8f8f8]'
      } !py-2 !px-4 !shadow-none text-gray-800 hover:bg-[royalblue] hover:!text-white transition-all duration-200`}
      onClick={() => {
        setOpenedChat(props?.chat);
        props?.setOpenedLayer('ChatRoom');
      }}
    >
      <div className='flex flex-col space-y-1'>
        <h2 className='leading-1 capitalize font-[500]'>
          {/* If it is a group, display the group name else display the second user name */}
          {props?.chat?.isGroupChat ? props?.chat?.name : chatMate?.username}
        </h2>

        {props?.chat?.latestMessage && (
          <p className='leading-1 text-[0.8rem]'>
            <span className='font-bold'>
              {props?.chat?.latestMessage?.sender?.username}:
            </span>{' '}
            {props?.chat?.latestMessage?.text}
          </p>
        )}
      </div>
    </ContentBox>
  );
};

export default SingleChat;

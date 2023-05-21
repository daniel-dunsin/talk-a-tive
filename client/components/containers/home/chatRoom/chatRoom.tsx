import ContentBox, { ContentBoxWithHeader } from '@/components/ui/contentBox';
import { FaEye } from 'react-icons/fa';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiArrowBack, BiLoaderAlt } from 'react-icons/bi';
import { useGlobalContext } from '@/lib/context';
import { getChatMate } from '@/lib/utilities/chat.utils';
import { OpenedChatModal } from '../home-components';
import { IMessage, IUser } from '@/lib/types/states.types';
import { GroupModal } from './groupModal';
import Scrollable from '@/components/ui/scrollable';
import MessageInput from './messageInput';
import { getAllMessages } from '@/lib/api/message';
import Messages from './messages';

interface ChatRoomProps {
  setOpenedLayer: Dispatch<SetStateAction<'ChatList' | 'ChatRoom'>>;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { openedChat, user } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const chatMate = openedChat && getChatMate(openedChat, user);

  const closeGroupModal = () => {
    setGroupModalOpen(false);
  };

  const fetchMessages = async () => {
    setLoading(true);
    const messages = await getAllMessages(openedChat?._id as string);
    setLoading(false);

    setMessages(messages);
  };

  useEffect(() => {
    if (openedChat?._id) {
      fetchMessages();
    }
  }, [openedChat]);

  if (!openedChat) {
    return (
      <ContentBox styles='col-span-2' size='md'>
        <div className='min-h-[77vh] flex items-center justify-center'>
          <p className='text-[1.5rem]'>Click on a user to start chatting</p>
        </div>
      </ContentBox>
    );
  }

  return (
    <ContentBoxWithHeader
      size='md'
      styles='col-span-2'
      itemRight={
        // Different function if it is a group chat

        <span
          className={styles.icon}
          onClick={() => {
            openedChat?.isGroupChat
              ? setGroupModalOpen(true)
              : setModalOpen(true);
          }}
        >
          <FaEye />
        </span>
      }
      itemLeft={
        // Display on mobile alone, to close the chat room on mobile
        <span
          className={styles.icon + ' md:hidden'}
          onClick={() => props.setOpenedLayer('ChatList')}
        >
          <BiArrowBack />
        </span>
      }
      text={
        openedChat?.isGroupChat
          ? openedChat?.name
          : (chatMate?.username as string)
      }
    >
      <>
        {groupModalOpen && openedChat?.isGroupChat && (
          <GroupModal
            onClose={closeGroupModal}
            title='Edit Group'
            name={openedChat?.name}
            // Remove the logged in user from the users list
            members={(openedChat?.users as IUser[])?.filter(
              (member) => member?._id !== user?._id
            )}
          />
        )}
      </>

      <>
        {/* After chats have been fetched */}
        {!loading && (
          <div className='w-full flex flex-col min-h-[65vh]'>
            {/* Modal for viewing chatmate */}
            {!openedChat?.isGroupChat && modalOpen && (
              <OpenedChatModal onClose={setModalOpen} />
            )}
            {/* Render messages */}
            <Scrollable height={'60vh'} styles={'min-h-[60vh]'}>
              <div className='flex flex-col space-y-1'>
                {messages?.map((message, index) => (
                  <Messages
                    message={message}
                    messages={messages}
                    key={message?._id}
                    index={index}
                  />
                ))}
              </div>
              <div className='h-[100vh]'></div>
            </Scrollable>
            <MessageInput setMessages={setMessages} messages={messages} />
          </div>
        )}

        {/* While fetching chats */}
        {loading && (
          <div className='w-full min-h-[65vh] animate-spin flex items-center justify-center text-gray-800'>
            <BiLoaderAlt className='text-[70px]' />
          </div>
        )}
      </>
    </ContentBoxWithHeader>
  );
};

const styles = {
  icon: 'flex items-center cursor-pointer justify-center text-[16px] w-[30px] h-[30px] bg-[#f0f0f0] text-gray-900 rounded-md',
};

export default ChatRoom;

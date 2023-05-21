import ContentBox, { ContentBoxWithHeader } from '@/components/ui/contentBox';
import { FaEye } from 'react-icons/fa';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useGlobalContext } from '@/lib/context';
import { getChatMate } from '@/lib/utilities/chat.utils';
import { GroupModal, OpenedChatModal } from './home-components';
import { IUser } from '@/lib/types/states.types';

interface ChatRoomProps {
  setOpenedLayer: Dispatch<SetStateAction<'ChatList' | 'ChatRoom'>>;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { openedChat, user } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);

  const chatMate = openedChat && getChatMate(openedChat, user);

  const closeGroupModal = () => {
    setGroupModalOpen(false);
  };

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

      <div className='w-full min-h-[65vh]'>
        {/* Modal for viewing chatmate */}
        {!openedChat?.isGroupChat && modalOpen && (
          <OpenedChatModal onClose={setModalOpen} />
        )}
      </div>
    </ContentBoxWithHeader>
  );
};

const styles = {
  icon: 'flex items-center cursor-pointer justify-center text-[16px] w-[30px] h-[30px] bg-[#f0f0f0] text-gray-900 rounded-md',
};

export default ChatRoom;

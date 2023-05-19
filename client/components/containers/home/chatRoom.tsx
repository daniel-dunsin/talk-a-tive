import ContentBox, { ContentBoxWithHeader } from '@/components/ui/contentBox';
import { FaEye } from 'react-icons/fa';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useGlobalContext } from '@/lib/context';
import { getChatMate } from '@/lib/utilities/chat.utils';
import { OpenedChatModal } from './home-components';

interface ChatRoomProps {
  setOpenedLayer: Dispatch<SetStateAction<'ChatList' | 'ChatRoom'>>;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { openedChat, user } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const chatMate = openedChat && getChatMate(openedChat, user);

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
        // Don't display the eye if it is a group chat
        openedChat?.isGroupChat ? (
          <></>
        ) : (
          <span className={styles.icon} onClick={() => setModalOpen(true)}>
            <FaEye />
          </span>
        )
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
      text={chatMate?.username as string}
    >
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

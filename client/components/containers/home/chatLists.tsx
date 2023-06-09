import ContentBox, { ContentBoxWithHeader } from '@/components/ui/contentBox';
import SingleChat from '@/components/ui/singleChat';
import { useGlobalContext } from '@/lib/context';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { GroupModal } from './chatRoom/groupModal';

// To import stuffs dynamically
import dynamic from 'next/dynamic';

const ChatsList = () => {
  const { chats, setChats } = useGlobalContext();
  const [createGroupModalOpen, setCreateGroupModalOpen] =
    useState<boolean>(false);

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
  };

  const fetchChats = async () => {
    const { getChats } = await import('@/lib/api/chat');

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
        <button
          className='flex items-center space-x-3 justify-center px-4 py-1 bg-[#f0f0f0] rounded-md'
          onClick={() => setCreateGroupModalOpen(true)}
        >
          <span>
            <BiPlus />
          </span>
          New Group
        </button>
      }
      text='My Chats'
    >
      <>
        {/* Render modal */}
        {createGroupModalOpen && (
          <GroupModal onClose={closeCreateGroupModal} title='Create Group' />
        )}

        {/* Render chats */}
        <div className='flex flex-col space-y-4'>
          {chats?.map((chat) => {
            return <SingleChat key={chat._id} chat={chat} />;
          })}
        </div>
      </>
    </ContentBoxWithHeader>
  );
};

export default ChatsList;

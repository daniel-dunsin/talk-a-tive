import { useGlobalContext } from '@/lib/context';
import { IChat, IUser } from '@/lib/types/states.types';
import { getChatMate } from '@/lib/utilities/chat.utils';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Modal from '@/components/ui/modalOverlay';
import Input from '@/components/ui/inputs';
import { Button } from '@/components/ui/buttons';
import { GroupUsersContainer } from '@/components/ui/usersContainer';
import {
  createGroup,
  editGroup,
  getChats,
  getUsers,
  leaveGroup,
} from '@/lib/api/chat';
import Scrollable from '@/components/ui/scrollable';
import Badge from '@/components/ui/badge';
import { errorRes } from '@/lib/api/api-responses';

interface OpenedChatModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const OpenedChatModal = (props: OpenedChatModalProps) => {
  const { openedChat, user } = useGlobalContext();

  const chatMate = getChatMate(openedChat as IChat, user);

  return (
    <Modal
      size='md'
      onClose={() => {
        props?.onClose(false);
      }}
      width={500}
    >
      <div>
        <h1 className='mb-1 text-[1.5rem] flex items-center justify-center'>
          {chatMate?.username}
        </h1>
        <h3 className='mt-2 mb-5 text-center'>email: {chatMate?.email}</h3>

        <div className='flex items-center justify-center'>
          <img
            src={chatMate?.dp}
            alt={chatMate?.username}
            className='w-[200px] h-[200px] rounded-full object-cover object-center border-[10px]'
          />
        </div>
      </div>
    </Modal>
  );
};

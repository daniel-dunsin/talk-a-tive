import { useGlobalContext } from '@/lib/context';
import { IMessage } from '@/lib/types/states.types';
import { ownsPreviousMessage } from '@/lib/utilities/chat.utils';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface IMessages {
  messages: IMessage[];
  message: IMessage;
  index: number;
}

const Messages = (props: IMessages) => {
  const { user, openedChat } = useGlobalContext();

  return (
    <article
      className={
        props?.message?.sender?._id === user?._id ? 'self-end' : 'self-start'
      }
    >
      <div className='flex items-center space-x-2'>
        {ownsPreviousMessage(props?.messages, props.index) &&
        props?.message?.sender?._id !== user?._id ? (
          <img
            className='w-[30px] h-[30px] object-cover rounded-full object-center'
            src={props?.message?.sender?.dp}
            alt={props?.message?.sender?.username}
          />
        ) : (
          <div className='mr-[30px]'></div>
        )}

        <p
          className={`p-2 rounded-md text-white max-w-[300px] text-[14px] ${
            props?.message?.sender?._id === user?._id
              ? 'bg-[royalblue]'
              : 'bg-[#555]'
          }`}
        >
          {props?.message?.text}
        </p>
      </div>
    </article>
  );
};

export default Messages;

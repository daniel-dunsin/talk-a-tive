import { sendMessage } from '@/lib/api/message';
import { useGlobalContext } from '@/lib/context';
import { IMessage } from '@/lib/types/states.types';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { FaPaperPlane } from 'react-icons/fa';
import { Socket } from 'socket.io-client';

export interface IMessageInput {
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  socket: Socket;
  typing: boolean;
  setTyping: Dispatch<SetStateAction<boolean>>;
  setLastTypingTime: Dispatch<SetStateAction<number>>;
}

const MessageInput = (props: IMessageInput) => {
  const { openedChat, user } = useGlobalContext();

  const [text, setText] = useState<string>('');

  let timeout: NodeJS.Timeout;

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length > 0) {
      setText('');
      const message = await sendMessage(text, openedChat?._id as string);

      props.socket.emit('send message', message);

      props.socket.emit('stop typing', openedChat);

      props.setMessages([...props.messages, message]);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    props.socket.emit('typing', openedChat);

    // Clear the timeout before setting a new one!!!!!!!!
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      props.socket.emit('stop typing', openedChat);
    }, 1500);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='w-full flex items-center space-x-2 flex-1'
    >
      <div className='flex-1'>
        <input
          type='text'
          value={text}
          onChange={onChange}
          className='w-full p-2 border-b-2 border-b-[#555] focus:border-[royalblue] outline-none bg-transparent transition-all duration-100'
          placeholder='Type message here'
        />
      </div>
      <button
        type='submit'
        className={`text-[16px] max-w-[36px] h-[36px] rounded-full flex items-center justify-center flex-1 transition-all duration-200 ${
          text.length > 0 ? '!bg-[royalblue] text-white' : 'text-black'
        }`}
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;

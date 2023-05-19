import { openChat } from '@/lib/api/chat';
import { useGlobalContext } from '@/lib/context';
import React, { Dispatch, SetStateAction } from 'react';
import ContentBox from './contentBox';

interface UsersContainerProps {
  username: string;
  dp: string;
  userId: string;
  subtitle?: {
    key: string;
    value: string;
  };
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const UsersContainer = (props: UsersContainerProps) => {
  const { setOpenedChat } = useGlobalContext();

  const accessChat = async () => {
    const chat = await openChat(props?.userId);
    if (chat) {
      setOpenedChat(chat);
      props.setSidebarOpen(false);
    }
  };

  return (
    <ContentBox
      size='sm'
      styles={`bg-[#f0f0f0] !py-2 !px-4 !shadow-none text-gray-800 hover:bg-[royalblue] hover:!text-white transition-all duration-200`}
      onClick={() => {
        accessChat();
      }}
    >
      <div
        className='flex items-center space-x-2 cursor-pointer'
        data-testid='users-containers'
      >
        <img
          src={props?.dp}
          className='inline-block mr-2 w-[40px] h-[40px] object-cover object-center rounded-full'
          alt={props?.username}
        />
        <div className='flex flex-col space-y-1'>
          <h2 className='leading-1 capitalize font-[500]'>{props?.username}</h2>
          {props?.subtitle?.value && (
            <p className='leading-1 text-[0.8rem]'>
              <span className='font-bold'>{props?.subtitle?.key}:</span>{' '}
              {props?.subtitle?.value}
            </p>
          )}
        </div>
      </div>
    </ContentBox>
  );
};

export default UsersContainer;

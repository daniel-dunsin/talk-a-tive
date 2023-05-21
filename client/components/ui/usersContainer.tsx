import { getChats, openChat } from '@/lib/api/chat';
import { useGlobalContext } from '@/lib/context';
import { IUser } from '@/lib/types/states.types';
import React, { Dispatch, SetStateAction } from 'react';
import ContentBox from './contentBox';

interface UsersContainerProps {
  user: IUser;
  subtitle?: {
    key: string;
    value: string;
  };
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  onClick?: (user: IUser) => void;
}

// For sidebar container

export const SidebarUsersContainer = (props: UsersContainerProps) => {
  const { setOpenedChat, setChats } = useGlobalContext();

  const accessChat = async () => {
    const chat = await openChat(props?.user?._id);
    const chats = await getChats();
    if (chat) {
      // Update all the chats
      setChats(chats);
      // Let it be the selected chat
      setOpenedChat(chat);
      // Close the sidebar
      props?.setSidebarOpen && props.setSidebarOpen(false);
    }
  };

  return (
    <ContentBox
      size='sm'
      styles={styles.container}
      onClick={() => {
        accessChat();
      }}
    >
      <UsersContainer {...props} />
    </ContentBox>
  );
};

// For group chat modal

export const GroupUsersContainer = (props: UsersContainerProps) => {
  return (
    <ContentBox
      size='sm'
      styles={styles.container}
      onClick={() => {
        props?.onClick && props.onClick(props?.user);
      }}
    >
      <UsersContainer {...props} />
    </ContentBox>
  );
};

export const UsersContainer = (props: UsersContainerProps) => (
  <div
    className='flex items-center gap-2 cursor-pointer'
    data-testid='users-containers'
  >
    <img
      src={props?.user?.dp}
      className='inline-block mr-2 w-[40px] h-[40px] object-cover object-center rounded-full'
      alt={props?.user?.username}
    />
    <div className='flex flex-col space-y-1'>
      <h2 className='leading-1 capitalize font-[500]'>
        {props?.user?.username}
      </h2>
      {props?.subtitle?.value && (
        <p className='leading-1 text-[0.8rem]'>
          <span className='font-bold'>{props?.subtitle?.key}:</span>{' '}
          {props?.subtitle?.value}
        </p>
      )}
    </div>
  </div>
);

const styles = {
  container: `bg-[#f9f9f9] !shadow-md !py-2 !px-4  text-gray-800 hover:bg-[#555] hover:!text-white transition-all duration-200`,
};

/**
 * This components are the ones to be rendered in the navbar.tsx
 */

import ContentBox from '@/components/ui/contentBox';
import Modal from '@/components/ui/modalOverlay';
import { logout } from '@/lib/api/auth';
import { useGlobalContext } from '@/lib/context';
import React, { Dispatch, SetStateAction } from 'react';
import { getChatMate } from '@/lib/utilities/chat.utils';

interface UserProfileListProps {
  setProfileTabOpen: Dispatch<SetStateAction<boolean>>;
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserProfileList = (props: UserProfileListProps) => {
  return (
    <ContentBox
      size='md'
      styles='scale-up absolute top-[150%] right-[0] w-[240px] max-w-[90vw] shadow-md z-[4] !p-0 overflow-hidden'
    >
      <div className={styles.flex_container}>
        <p
          className={styles.paragraph}
          onClick={() => {
            props.setProfileModalOpen(true);
            props.setProfileTabOpen(false);
          }}
        >
          My Profile
        </p>
        <p className={styles.paragraph} onClick={logout}>
          Log out
        </p>
      </div>
    </ContentBox>
  );
};

interface ProfileModalProps {
  setProfileModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProfileModal = (props: ProfileModalProps) => {
  const { user } = useGlobalContext();

  return (
    <Modal
      width={600}
      size='md'
      onClose={() => props.setProfileModalOpen(false)}
    >
      <div>
        <h1 className='mb-1 text-[1.5rem] flex items-center justify-center'>
          {user?.username}
        </h1>
        <h3 className='mt-2 mb-5 text-center'>email: {user?.email}</h3>

        <div className='flex items-center justify-center'>
          <img
            src={user?.dp}
            alt={user?.username}
            className='w-[200px] h-[200px] rounded-full object-cover object-center border-[10px]'
          />
        </div>
      </div>
    </Modal>
  );
};

interface INotificationDrawerOpen {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const NotificationDrawer = (props: INotificationDrawerOpen) => {
  const { notifications, user, setOpenedChat } = useGlobalContext();

  return (
    <ContentBox
      size='md'
      styles='scale-up absolute top-[150%] right-[0] w-[240px] max-w-[90vw] shadow-md z-[4] !p-0 overflow-hidden'
    >
      {notifications?.length === 0 ? (
        <>
          <p className={styles.paragraph}>No new notification</p>
        </>
      ) : (
        notifications?.map((notification) => {
          return (
            <p
              className={styles.paragraph}
              onClick={() => {
                setOpenedChat(notification);
                props.setDrawerOpen(false);
              }}
            >
              {/* If it is a group chat, display group name, else display other user name */}
              {notification?.isGroupChat
                ? notification?.name
                : getChatMate(notification, user)?.username}
            </p>
          );
        })
      )}
    </ContentBox>
  );
};

const styles = {
  paragraph: 'w-full p-3 hover:bg-blue-50 cursor-pointer',
  flex_container: 'flex flex-col',
};

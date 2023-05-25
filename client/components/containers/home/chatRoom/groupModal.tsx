import { useGlobalContext } from '@/lib/context';
import { IChat } from '@/lib/types/states.types';
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
import { IUser } from '@/lib/types/states.types';

// This modal will be used for editing and creating groups
interface GroupModalProps {
  onClose: () => void;
  title: 'Create Group' | 'Edit Group';
  // Pass the members and group name if you're editing
  members?: IUser[];
  name?: string;
}

export const GroupModal = (props: GroupModalProps) => {
  const { chats, setChats, openedChat, setOpenedChat } = useGlobalContext();

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addingGroup, setAddingGroup] = useState<boolean>(false);
  const [leavingGroup, setLeavingGroup] = useState<boolean>(false);
  // Input states
  const [name, setName] = useState<string>(props?.name || '');
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>();
  // This is for the users that have been selected
  const [members, setMembers] = useState<IUser[]>(props?.members || []);

  const addUser = (user: IUser) => {
    if (!members?.find((member) => member?._id === user?._id)) {
      // Add the user to the members array
      setMembers([...members, user]);
    }
  };

  const removeUser = (user: IUser) => {
    // add the user to the fetched users array and remove from the members array
    setMembers((prev) => prev.filter((prevUser) => prevUser._id !== user._id));
  };

  const fetchUsers = async () => {
    if (search.length > 0) {
      setIsLoading(true);

      const users = await getUsers(search);

      setIsLoading(false);
      // Set users to the users that have not been selected
      setUsers(users as IUser[]);
    }
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (members?.length <= 1) {
      errorRes('Add at least 2 members');
      return;
    }

    setAddingGroup(true);

    // Different requests if you're creating a group
    const group =
      props?.title === 'Create Group'
        ? await createGroup({ name, users: members })
        : await editGroup({ name, users: members }, openedChat?._id as string);

    // Fetch all chats again
    const chats = await getChats();

    setAddingGroup(false);
    if (group) {
      setChats(chats);
      setOpenedChat(null);
      props?.onClose();
    }
  };

  const comotGroup = async () => {
    setLeavingGroup(true);

    const group = await leaveGroup(openedChat?._id as string);

    // Fetch all chats again
    const chats = await getChats();

    setLeavingGroup(false);
    setOpenedChat(null);
    if (group) {
      setChats(chats);
      setOpenedChat(null);
      props?.onClose();
    }
  };

  return (
    <Modal width={500} size='md' onClose={props.onClose}>
      <div>
        <h1 className='mb-1 text-[1.5rem] flex items-center justify-center'>
          {props?.title}
        </h1>
      </div>

      <form onSubmit={onSubmit} className='flex flex-col space-y-4 mt-4'>
        <Input
          type='text'
          placeholder='Enter group name'
          value={name}
          onChange={(text) => setName(text)}
          name='name'
        />

        {/* Getting Users */}
        <div className='grid grid-cols-3 space-x-4'>
          <div className='col-span-2'>
            <Input
              type='text'
              placeholder='Add User e.g Daniel, Adejare, Dunsin'
              value={search}
              onChange={(text) => setSearch(text)}
              name='search'
              notRequired={true}
            />
          </div>
          <Button
            text='Search'
            color='white'
            onClick={fetchUsers}
            isLoading={isLoading}
          />
        </div>

        {/* Render users that have been added */}
        <div className='flex flex-row space-x-3'>
          {members.map((member) => (
            <Badge user={member} remove={removeUser} key={member?._id} />
          ))}
        </div>

        {/* Render fetched users */}

        <div className='mt-2 flex flex-col space-y-3'>
          <Scrollable height={200}>
            <>
              {users?.map((user) => (
                <GroupUsersContainer
                  user={user}
                  subtitle={{ key: 'Email', value: user?.email }}
                  key={user?._id}
                  onClick={addUser}
                />
              ))}
            </>
          </Scrollable>
        </div>

        <div className='grid grid-cols-3 space-x-2 '>
          <div
            className={`${
              props?.title !== 'Edit Group' ? 'col-span-3' : 'col-span-2'
            }`}
          >
            <Button
              text={props?.title}
              submitType={true}
              color='white'
              bg='#555'
              isLoading={addingGroup}
              fullWidth={true}
            />
          </div>
          {/* Only display when user wants to edit a group */}
          {props?.title === 'Edit Group' && (
            <div className='col-span-1'>
              <Button
                text={'Leave group'}
                submitType={false}
                onClick={comotGroup}
                bg={'rgb(220, 28,28)'}
                color='white'
                fullWidth={true}
                isLoading={leavingGroup}
              />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

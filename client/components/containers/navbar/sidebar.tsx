import Input from '@/components/ui/inputs';
import Overlays from '@/components/ui/overlays';
import UsersContainer from '@/components/ui/usersContainer';
import { getUsers } from '@/lib/api/chat';
import { IUser } from '@/lib/types/states.types';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = (props: SidebarProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const searchUsers = async () => {
    if (search.length > 0) {
      setIsLoading(true);

      const users: IUser[] | undefined = await getUsers(search);

      (users as IUser[])?.length > 0 && setUsers(users as IUser[]);

      setIsLoading(false);
    }
  };

  return (
    <Overlays styles={props.sidebarOpen ? '' : '!invisible'}>
      <div
        className={`w-full sm:max-w-[350px] visib max-w-full bg-white h-screen overflow-x-hidden overflow-y-scroll transition duration-600 ${
          props.sidebarOpen ? 'translate-x-0' : '-translate-x-[100%]'
        }`}
      >
        <header className='p-4 border-b-[1.5px] flex items-center justify-between'>
          <h2 className='font-lighter text-gray-800 text-[1.4rem]'>
            Search Users
          </h2>
          <span
            className='font-bold text-red-600 text-[1.4rem] cursor-pointer'
            onClick={() => props.setSidebarOpen(false)}
          >
            <MdClose />
          </span>
        </header>
        <div className='p-4'>
          {/* Input container */}
          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <Input
                type='search'
                value={search}
                onChange={(text) => setSearch(text)}
                name='search'
                placeholder='Enter username or email'
              />
            </div>
            <button
              className='min-w-fit font-[500] rounded-md py-2 px-3 bg-[#f0f0f0] text-black'
              onClick={searchUsers}
            >
              GO
            </button>
          </div>

          {/* Users list */}
          <div className='flex w-full flex-col mt-4 space-y-4'>
            {users?.map((user: IUser, index: number) => (
              <UsersContainer
                setSidebarOpen={props.setSidebarOpen}
                key={user?._id}
                username={user?.username}
                userId={user?._id}
                dp={user?.dp}
                subtitle={{ key: 'Email', value: user?.email }}
              />
            ))}
          </div>

          {/* Loader */}
          {isLoading && (
            <span className='block mt-6 animate-spin max-w-fit ml-auto text-[1.8rem]'>
              <BiLoaderAlt />
            </span>
          )}
        </div>
      </div>
    </Overlays>
  );
};

export default Sidebar;

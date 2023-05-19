import { useGlobalContext } from '@/lib/context';
import React, { useState } from 'react';
import { BiBell, BiChevronDown, BiSearch } from 'react-icons/bi';
import ContentBox from '../../ui/contentBox';
import { ProfileModal, UserProfileList } from './navbar-components';
import Sidebar from './sidebar';

const Navbar = () => {
  const [profileTabOpen, setProfileTabOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { user } = useGlobalContext();

  return (
    <>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Navbar */}
      <ContentBox size='sm' styles='w-full !rounded-none'>
        <nav className='w-full flex items-center justify-between'>
          <button
            className='p-1 cursor-pointer'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='align-middle inline-block pr-2'>
              <BiSearch />
            </span>
            <p className='sm:inline-block hidden'>Search user</p>
          </button>

          <h1 className='text-[1.5rem] text-gray-800 sm:inline-block hidden'>
            Talk-A-Tive
          </h1>

          <div className='flex flex-row space-x-7 items-center'>
            {/* Notification */}
            <div>
              <span className='text-[25px] text-gray-800'>
                <BiBell />
              </span>
            </div>

            {/* User profile */}
            <div className='relative'>
              <div onClick={() => setProfileTabOpen((prev) => !prev)}>
                <img
                  src={user?.dp}
                  alt={user?.username}
                  className='w-[30px] h-[30px] inline-block rounded-full object-center object-cover'
                />
                <span className='inline-block align-middle pl-1 text-[1.4rem] cursor-pointer'>
                  <BiChevronDown />
                </span>
              </div>
              {profileTabOpen && (
                <UserProfileList
                  setProfileModalOpen={setProfileModalOpen}
                  setProfileTabOpen={setProfileTabOpen}
                />
              )}

              {profileModalOpen && (
                <ProfileModal setProfileModalOpen={setProfileModalOpen} />
              )}
            </div>
          </div>
        </nav>
      </ContentBox>
    </>
  );
};

export default Navbar;

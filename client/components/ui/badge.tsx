import { IUser } from '@/lib/types/states.types';
import React from 'react';
import { MdCancel } from 'react-icons/md';

interface IBadge {
  user: IUser;
  remove: (user: IUser) => void;
}

const Badge = (props: IBadge) => {
  return (
    <div className='p-2 rounded-md bg-[#555] text-white cursor-pointer uppercase font-bold flex space-x-2 items-center'>
      <p className='text-[12px]'>{props?.user?.username}</p>
      <span onClick={() => props.remove(props.user)}>
        <MdCancel />
      </span>
    </div>
  );
};

export default Badge;

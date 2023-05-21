import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const Preloader = () => {
  return (
    <span className='block mt-6 animate-spin max-w-fit ml-auto text-[1.8rem]'>
      <BiLoaderAlt />
    </span>
  );
};

export default Preloader;

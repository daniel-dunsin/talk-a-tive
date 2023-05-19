import React, { ReactElement } from 'react';
import ContentBox from './contentBox';
import { MdClose } from 'react-icons/md';
import Overlays from './overlays';

interface ModalProps {
  width: number;
  size: 'md' | 'lg' | 'sm';
  children: ReactElement | ReactElement[];
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <Overlays center={true}>
      <div
        className={`bg-white rounded-md scale-up ${
          props?.size === 'sm' ? 'p-4' : props?.size == 'md' ? 'p-6' : 'p-8'
        } shadow-md w-[90vw] relative`}
        style={{ maxWidth: props.width }}
      >
        {/* Icon for closing the modal */}
        <span
          className='text-[1.4rem] cursor-pointer text-red-500 absolute top-[30px] right-[30px]'
          onClick={props.onClose}
        >
          <MdClose />
        </span>

        {props.children}
      </div>
    </Overlays>
  );
};

export default Modal;

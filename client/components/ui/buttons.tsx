import React, { ReactElement } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export interface ITabButton {
  selected: boolean;
  text: string;
  onClick: () => void;
}

export const TabButton = (props: ITabButton) => {
  return (
    <button
      className={`w-full p-2 cursor-pointer rounded-[30px] text-center ${
        props?.selected
          ? `bg-blue-200 text-blue-900`
          : `bg-white text-gray-800 hover:bg-blue-50`
      }`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export interface IButton {
  fullWidth?: boolean;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  fitContent?: boolean;
  bg?: string;
  color?: string;
  submitType?: boolean;
  onClick?: () => void;
  text: string;
  isLoading?: boolean;
  extraStyles?: string;
}

export const Button = (props: IButton) => {
  return (
    <button
      className={`rounded-md p-2 outline-none ${props.fullWidth && 'w-full'} ${
        props.fitContent && 'max-w-fit'
      } ${props.extraStyles}`}
      onClick={props.onClick}
      type={props.submitType ? 'submit' : 'button'}
      style={{
        color: props.color || '#000',
        backgroundColor: props.bg || '#555',
      }}
    >
      <p>
        {props.isLoading ? (
          <span className='text-[1.2rem] animate-spin inline-block mx-auto'>
            <BiLoaderAlt />
          </span>
        ) : (
          props.text
        )}
      </p>

      {/* ICONS */}
      {(props.iconLeft || props.iconRight) && (
        <span
          className={`inline-block align-middle ${
            props.iconLeft ? 'mr-2' : 'ml-2'
          }`}
        >
          {props.iconLeft || props.iconRight}
        </span>
      )}
    </button>
  );
};

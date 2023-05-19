import React, { ReactElement } from 'react';

export interface IContentBoxProps {
  children: ReactElement | ReactElement[];
  styles?: string;
  size: 'lg' | 'sm' | 'md';
  onClick?: () => void;
}

const ContentBox = (props: IContentBoxProps) => {
  return (
    <div
      className={`bg-white rounded-md ${
        props?.size === 'sm' ? 'p-4' : props?.size == 'md' ? 'p-6' : 'p-8'
      } shadow-md ${props.styles}`}
      onClick={props?.onClick && props?.onClick}
    >
      {props.children}
    </div>
  );
};

export default ContentBox;

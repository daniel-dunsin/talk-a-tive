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

interface ContentBoxWithHeaderProps extends IContentBoxProps {
  text: string;
  itemLeft?: ReactElement;
  itemRight: ReactElement;
}

export const ContentBoxWithHeader = (props: ContentBoxWithHeaderProps) => {
  return (
    <ContentBox size={props.size} styles={props.styles}>
      <header className='flex items-center justify-between'>
        <div className='flex items-center gap-x-4'>
          {props.itemLeft}
          <h1 className='text-[100] text-[1.5rem] capitalize'>{props.text}</h1>
        </div>
        {props.itemRight}
      </header>
      <div className='bg-[#f0f0f0] p-4 mt-2 rounded-md'>{props.children}</div>
    </ContentBox>
  );
};

export default ContentBox;

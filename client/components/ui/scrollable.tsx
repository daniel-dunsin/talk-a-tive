import React, { ReactElement } from 'react';

interface IScrollable {
  children: ReactElement | ReactElement[];
  height: number;
}

const Scrollable = (props: IScrollable) => {
  return (
    <div
      className='w-full overflow-y-scroll overflow-x-hidden'
      style={{ maxHeight: props.height }}
    >
      {props.children}
    </div>
  );
};

export default Scrollable;

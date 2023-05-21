import React, { ReactElement } from 'react';

interface IScrollable {
  children: ReactElement | ReactElement[];
  height: number | string;
  styles?: string;
}

const Scrollable = (props: IScrollable) => {
  return (
    <div
      className={`${props?.styles} w-full overflow-y-scroll overflow-x-hidden`}
      style={{ maxHeight: props.height }}
    >
      {props.children}
    </div>
  );
};

export default Scrollable;

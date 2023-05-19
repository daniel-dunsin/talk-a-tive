import React, { ReactElement } from 'react';

interface OverlaysProps {
  children: ReactElement | ReactElement[];
  center?: boolean;
  styles?: string;
}

const Overlays = (props: OverlaysProps) => {
  return (
    <section
      className={`fixed top-0 left-0 z-[100] ${
        props.center && 'flex items-center justify-center'
      } w-screen min-h-screen bg-[rgba(0,0,0,0.5)] ${props.styles}`}
    >
      {props.children}
    </section>
  );
};

export default Overlays;

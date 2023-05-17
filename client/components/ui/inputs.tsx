import React from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  label?: string;
}

const Input = (props: InputProps) => {
  return (
    <div className='flex flex-col space-y-1'>
      {props.label && <label htmlFor={props.placeholder}>{props?.label}</label>}
      <input
        id={props.placeholder}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className='w-full p-[6px] rounded-md text-[1rem] border-[1.5px] outline-none focus:border-blue-900'
        required
        autoComplete=''
      />
    </div>
  );
};

export default Input;

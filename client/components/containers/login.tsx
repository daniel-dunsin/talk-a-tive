import React, { useState } from 'react';
import { Button } from '../ui/buttons';
import Input from '../ui/inputs';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form action=''>
      <div className='flex flex-col space-y-4 mb-3'>
        <Input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={email}
          onChange={(text) => {
            setEmail(text);
          }}
          label='Email Address'
        />
        <Input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={password}
          onChange={(text) => setPassword(text)}
          label={'Password'}
        />
      </div>

      <div className='mt-4'>
        <Button
          text='Log in'
          submitType={true}
          fullWidth={true}
          bg={'royalblue'}
          color='white'
        />
      </div>
      <div className='mt-2'>
        <Button
          text='Get User Credentials'
          fullWidth={true}
          bg={'rgb(220, 28,28)'}
          color='white'
        />
      </div>
    </form>
  );
};

export default Login;

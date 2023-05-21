import { login } from '@/lib/api/auth';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '../ui/buttons';
import Input from '../ui/inputs';

const Login = () => {
  const [detail, setDetail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = await login({ detail, password });
      if (data) {
        router.push('/');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getGuestUser = () => {
    setDetail('guest@gmail.com');
    setPassword('123456789');
  };
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col space-y-4 mb-3'>
        <Input
          type='text'
          name='detail'
          placeholder='Enter your email/username'
          value={detail}
          onChange={(text) => {
            setDetail(text);
          }}
          label='Email Address / Username'
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
          isLoading={isLoading}
        />
      </div>
      <div className='mt-2'>
        <Button
          text='Get guest user credentials'
          fullWidth={true}
          bg={'rgb(220, 28,28)'}
          color='white'
          onClick={getGuestUser}
        />
      </div>
    </form>
  );
};

export default Login;

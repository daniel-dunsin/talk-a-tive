import { errorRes } from '@/lib/api/api-responses';
import { register } from '@/lib/api/auth';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '../ui/buttons';
import Input from '../ui/inputs';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [dp, setDp] = useState<string | File>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 8) {
      errorRes('Password is too short');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      errorRes('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const data = await register({
        username,
        email,
        password,
        confirmPassword,
        dp,
      });

      if (data) router.push('/');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col space-y-2 mb-3'>
        {/* Username */}
        <Input
          type='text'
          name='username'
          placeholder='Enter your username'
          value={username}
          onChange={(text) => setUsername(text)}
          label='Username'
        />

        {/* Email */}
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

        {/* Password */}
        <Input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={password}
          onChange={(text) => setPassword(text)}
          label={'Password'}
        />

        {/* Confirm Password */}
        <Input
          type='password'
          name='confirmPassword'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={(text) => setConfirmPassword(text)}
          label={'Confirm Password'}
        />

        {/* Image */}
        <div className='flex flex-col space-y-1'>
          <label htmlFor='Image'>Upload your picture</label>
          <input
            type={'file'}
            accept='image/*'
            onChange={(e) => setDp(e.target.files?.[0] as File)}
            className='p-2'
          />
        </div>
      </div>

      <div className='mt-4'>
        <Button
          text='Register'
          bg='royalblue'
          submitType={true}
          fullWidth={true}
          color='white'
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default Register;

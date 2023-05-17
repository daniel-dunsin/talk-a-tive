import React, { useState } from 'react';
import { Button } from '../ui/buttons';
import Input from '../ui/inputs';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [dp, setDp] = useState<string | File>('');

  return (
    <form>
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
        />
      </div>
    </form>
  );
};

export default Register;

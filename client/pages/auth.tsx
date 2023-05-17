import Login from '@/components/containers/login';
import Register from '@/components/containers/register';
import { TabButton } from '@/components/ui/buttons';
import ContentBox from '@/components/ui/contentBox';
import React, { useState } from 'react';

type ITabs = 'login' | 'register';

const Auth = () => {
  const [tabOpened, setTabOpened] = useState<ITabs>('login');

  const changeTab = (tab: ITabs) => setTabOpened(tab);

  return (
    <section className='w-full min-h-screen flex flex-col space-y-2 justify-start items-center pt-8 px-5'>
      <ContentBox size='sm' styles='max-h-fit w-[90vw] max-w-[500px]'>
        <h1 className={styles.title}>Talk-A-Tive</h1>
      </ContentBox>
      <ContentBox size='sm' styles='max-h-fit w-[90vw] max-w-[500px]'>
        <div className='flex space-x-2'>
          <TabButton
            text='Login'
            selected={tabOpened === 'login'}
            onClick={() => changeTab('login')}
          />
          <TabButton
            text='Register'
            selected={tabOpened === 'register'}
            onClick={() => changeTab('register')}
          />
        </div>

        <div className='pt-[1rem]'>
          {tabOpened === 'login' ? <Login /> : <Register />}
        </div>
      </ContentBox>
    </section>
  );
};

const styles = {
  title: 'text-[1.7rem] font-lighter text-gray-700 text-center',
};

export default Auth;

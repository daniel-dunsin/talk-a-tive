import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/containers/navbar/navbar';
import ChatsList from '@/components/containers/home/chatLists';
import ChatRoom from '@/components/containers/home/chatRoom/chatRoom';
import { useGlobalContext } from '@/lib/context';

export default function Home() {
  const { openedChat } = useGlobalContext();

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    typeof window !== 'undefined' &&
      window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      {width >= 900 && (
        <div className='w-full grid-cols-1 sm:grid-cols-3 grid p-4 gap-4'>
          <ChatsList />
          <ChatRoom />
        </div>
      )}

      {width < 900 && (
        <div className='p-4'>{!openedChat ? <ChatsList /> : <ChatRoom />}</div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/containers/navbar/navbar';
import ChatsList from '@/components/containers/home/chatLists';
import ChatRoom from '@/components/containers/home/chatRoom/chatRoom';

export default function Home() {
  // For mobile screens only
  const [openedLayer, setOpenedLayer] = useState<'ChatRoom' | 'ChatList'>(
    'ChatList'
  );

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
          <ChatsList setOpenedLayer={setOpenedLayer} />
          <ChatRoom setOpenedLayer={setOpenedLayer} />
        </div>
      )}

      {width < 900 && (
        <div className='p-4'>
          {openedLayer === 'ChatList' ? (
            <ChatsList setOpenedLayer={setOpenedLayer} />
          ) : (
            <ChatRoom setOpenedLayer={setOpenedLayer} />
          )}
        </div>
      )}
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/containers/navbar/navbar';

export default function Home() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
    </div>
  );
}

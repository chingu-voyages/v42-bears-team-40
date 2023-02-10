import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NavLinks from './NavLinks';

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Yard Sale</title>
      </Head>
      <Navbar handleToggle={setIsSidebarOpen} />
      <div className='bg-light-green min-height'>{children}</div>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='sidebar-content'>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='absolute top-3 left-3'
          >
            <img src='/images/close.png' className='h-8' />
          </button>
          <header>
            <Image
              src='/images/yard-sale-grass-1.png'
              alt='logo'
              height={200}
              width={200}
            />
          </header>
          <NavLinks id={session?.user.id} handleToggle={setIsSidebarOpen} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Yard Sale</title>
      </Head>
      <Navbar />
      <div className='bg-light-green min-height'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

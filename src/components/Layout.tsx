import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="bg-light-green min-height">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

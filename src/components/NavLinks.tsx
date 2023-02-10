import { SetStateAction, Dispatch } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type NavLinkProps = {
  id: string;
  handleToggle: Dispatch<SetStateAction<boolean>>;
};

const NavLinks = ({ id, handleToggle }: NavLinkProps) => {
  const handleSignOut = () => {
    handleToggle(false);
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className='sidebar-nav-links text-light-green tracking-widest'>
      <Link
        onClick={() => handleToggle(false)}
        className='sidebar-nav-link'
        href={`/yard/${id}`}
      >
        <span className='icon'>
          <img
            className='h-10 mr-3'
            src='/images/profile-icon.png'
            alt='profile icon'
          />
        </span>
        Profile
      </Link>

      <Link
        onClick={() => handleToggle(false)}
        className='sidebar-nav-link'
        href={`/yard/${id}/item/add-item`}
      >
        <span className='icon'>
          <img className='h-10 mr-3' src='/images/add.png' alt='profile icon' />
        </span>
        Add Item
      </Link>

      <button className='sidebar-nav-link ' onClick={handleSignOut}>
        <span className='icon'>
          <img
            className='h-10 mr-3'
            src='/images/logout.png'
            alt='profile icon'
          />
        </span>
        Log out
      </button>
    </div>
  );
};

export default NavLinks;

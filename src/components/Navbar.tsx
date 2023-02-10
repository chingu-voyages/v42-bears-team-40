import { SetStateAction, Dispatch } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

type NavProps = {
  handleToggle: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ handleToggle }: NavProps) => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  const isAdding = router.pathname.includes('add-item');

  return (
    <nav className='h-24 bg-dark-green text-gray-50 tracking-wide md:text-lg drop-shadow-lg'>
      <div className='nav-center flex justify-between h-full items-center mx-12'>
        <div className='logo flex'>
          <Link href='/'>
            <Image
              src='/images/yard-sale-grass-1.png'
              alt='logo'
              height={100}
              width={100}
              className='justify-self-start'
            />
          </Link>
        </div>
        {session ? (
          <>
            <div className='nav-links hidden md:flex justify-between space-x-4 md:space-x-8 '>
              <Link className='hover:text-custom-yellow' href={`/yard/${id}`}>
                Profile
              </Link>
              {!isAdding && (
                <Link
                  className='hover:text-custom-yellow'
                  href={`/yard/${id}/item/add-item`}
                >
                  Add Item
                </Link>
              )}
              <button
                className='hover:text-custom-yellow'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Log out
              </button>
            </div>
            <button onClick={() => handleToggle(true)} className='md:hidden'>
              <img
                src='/images/toggle.png'
                className='h-10 hover:scale-105'
              ></img>
            </button>
          </>
        ) : (
          <Link className='hover:text-custom-yellow' href='/login'>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

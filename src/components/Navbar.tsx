import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  const isAdding = router.pathname.includes('add-item');

  return (
    <nav className='h-24 bg-dark-green text-gray-50 tracking-wide md:text-lg drop-shadow-lg'>
      <div className='nav-center flex justify-between h-full items-center mx-6 md:mx-10'>
        <div className='logo hover:text-custom-yellow flex items-center'>
          <Link href='/'>
            <Image
              src='/images/yard-sale.png'
              alt='logo'
              height={150}
              width={150}
            />
          </Link>
        </div>
        <div className='nav-links flex justify-between space-x-4 md:space-x-8'>
          {session ? (
            <>
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
            </>
          ) : (
            <Link className='hover:text-custom-yellow' href='/login'>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

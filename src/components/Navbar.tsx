import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  const isAdding = router.pathname.includes('add-item');
  const home = session ? `/yard/${id}` : '/';

  return (
    <nav className="h-16 bg-dark-green text-gray-50 tracking-wide md:text-lg">
      <div className="nav-center flex justify-between h-full items-center mx-6 md:mx-10">
        <div className="logo hover:text-custom-yellow">
          <a href={home}>Yard Sale</a>
        </div>
        <div className="nav-links flex justify-between space-x-4 md:space-x-8">
          {session ? (
            <>
              {!isAdding && (
                <Link
                  className="hover:text-custom-yellow"
                  href={`/yard/${id}/item/add-item`}
                >
                  Add Item
                </Link>
              )}
              <button
                className="hover:text-custom-yellow"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Log out
              </button>
            </>
          ) : (
            <Link className="hover:text-custom-yellow" href="/login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
    <nav className="h-16">
      <div className="nav-center flex justify-between h-full items-center mx-10">
        <div className="logo">
          <a href={home}>Yard Sale</a>
        </div>
        <div className="nav-links flex justify-between space-x-8">
          {session ? (
            <>
              {!isAdding && (
                <Link href={`/yard/${id}/item/add-item`}>Add Item</Link>
              )}
              <button onClick={() => signOut()}>Log out</button>
            </>
          ) : (
            <Link href="/login">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
